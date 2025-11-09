#![no_std]
use soroban_sdk::{
    contract, contractimpl, log, symbol_short, vec, Address, Env, String, Symbol, Vec,
};

mod data_structures;
mod error;
mod storage_key;

use error::Error;
// use storage_key::StorageKey;

use crate::data_structures::Sample;

const ALL_SAMPLES_KEY: Symbol = symbol_short!("A_SAMPLES");
const PLATFORM_FEE_KEY: Symbol = symbol_short!("P_FEE");
const TOTAL_SAMPLES_KEY: Symbol = symbol_short!("T_SAMPLES");
const PLATFORM_ADDRESS_KEY: Symbol = symbol_short!("P_ADDRESS");
const TOTAL_VOLUME_KEY: Symbol = symbol_short!("T_VOLUME");

#[contract]
pub struct Sampled {}

#[contractimpl]
impl Sampled {
    pub fn __constructor(env: Env, platform_fee: u32, platform_address: Address) {
        let storage = env.storage().instance();
        if storage.has(&PLATFORM_ADDRESS_KEY) {
            panic!("Contract already exists");
        }

        storage.set(&PLATFORM_ADDRESS_KEY, &platform_address);
        storage.set(&PLATFORM_FEE_KEY, &platform_fee);
        storage.set(&TOTAL_SAMPLES_KEY, &0u32);
        storage.set(&TOTAL_VOLUME_KEY, &0i128);

        log!(
            &env,
            "Sample contract deployed with {}% plaform fee",
            platform_fee
        );
    }

    /// UPLOAD a sample
    pub fn upload_sample(
        env: Env,
        seller: Address,
        price: i128,
        ipfs_link: String,
        title: String,
        bpm: u32,
        genre: String,
        cover_image: String,
    ) -> u32 {
        let storage = env.storage().persistent();
        seller.require_auth();

        if price <= 0 {
            panic!("Price cannot be {}", price)
        }

        let mut total_samples: u32 = storage.get(&TOTAL_SAMPLES_KEY).unwrap_or(0);

        let sample = Sample {
            seller: seller.clone(),
            price,
            ipfs_link: ipfs_link.clone(),
            title: title.clone(),
            bpm,
            genre: genre.clone(),
            id: total_samples,
            total_sales: 0u32,
            is_active: true,
            cover_image: cover_image.clone(),
        };

        storage.set(&total_samples, &sample);

        // Add to all samples
        let mut all_samples: Vec<Sample> = storage.get(&ALL_SAMPLES_KEY).unwrap_or(vec![&env]);
        all_samples.push_front(sample.clone());
        storage.set(&ALL_SAMPLES_KEY, &all_samples);
        storage.extend_ttl(
            &ALL_SAMPLES_KEY,
            env.storage().max_ttl(),
            env.storage().max_ttl(),
        );

        let mut user_samples: Vec<Sample> = storage.get(&seller).unwrap_or(vec![&env]);
        user_samples.push_front(sample.clone());

        storage.set(&seller, &user_samples);
        storage.extend_ttl(&seller, env.storage().max_ttl(), env.storage().max_ttl());
        total_samples += 1;
        storage.set(&TOTAL_SAMPLES_KEY, &total_samples);
        storage.extend_ttl(
            &TOTAL_SAMPLES_KEY,
            env.storage().max_ttl(),
            env.storage().max_ttl(),
        );

        total_samples - 1
    }

    /// GET a sample
    pub fn get_sample(env: Env, sample_id: u32) -> Result<Sample, Error> {
        let storage = env.storage().persistent();
        let sample_opt: Option<Sample> = storage.get(&sample_id);
        match sample_opt {
            Some(value) => Ok(value),
            None => Err(Error::SampleNotFound),
        }
    }

    /// UPDATE a sample price
    pub fn update_price(
        env: Env,
        new_price: i128,
        sample_id: u32,
        seller: Address,
    ) -> Result<(), Error> {
        seller.require_auth();
        let storage = env.storage().persistent();
        let sample: Option<Sample> = storage.get(&sample_id);
        match sample {
            Some(mut value) => {
                if seller != value.seller {
                    return Err(Error::NotAuthorized);
                }

                if new_price <= 0 {
                    return Err(Error::InvalidPrice);
                }
                value.price = new_price;
                storage.set(&sample_id, &value);
            }
            None => {
                panic!("Sample not found")
            }
        };

        Ok(())
    }

    /// GET user samples
    pub fn get_user_samples(env: Env, user_address: Address) -> Vec<Sample> {
        env.storage()
            .persistent()
            .get(&user_address)
            .unwrap_or(vec![&env])
    }

    pub fn get_all_samples(env: Env) -> Vec<Sample> {
        env.storage()
            .persistent()
            .get(&ALL_SAMPLES_KEY)
            .unwrap_or(vec![&env])
    }
}
