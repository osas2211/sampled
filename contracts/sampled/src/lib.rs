#![no_std]
use soroban_sdk::{contract, contractimpl, log, vec, Address, Env, String, Vec};

mod data_structures;
mod error;
mod storage_key;

use storage_key::StorageKey;

use crate::data_structures::Sample;

#[contract]
pub struct Sampled {}

#[contractimpl]
impl Sampled {
    pub fn __constructor(env: Env, platform_fee: u32, platform_address: Address) {
        let storage = env.storage().instance();
        if storage.has(&StorageKey::PlatformAddress) {
            panic!("Contract already exists");
        }

        storage.set(&StorageKey::PlatformAddress, &platform_address);
        storage.set(&StorageKey::PlaformFee, &platform_fee);
        storage.set(&StorageKey::TotalSamples, &0u32);
        storage.set(&StorageKey::TotalVolume, &0i128);

        log!(
            &env,
            "Sample contract deployed with {}% plaform fee",
            platform_fee
        );
    }

    pub fn upload_sample(
        env: Env,
        seller: Address,
        price: i128,
        ipfs_hash: String,
        title: String,
        bpm: u32,
        genre: String,
    ) -> u32 {
        let storage = env.storage().persistent();
        seller.require_auth();

        if price <= 0 {
            panic!("Price cannot be {}", price)
        }

        let mut total_samples: u32 = storage.get(&StorageKey::TotalSamples).unwrap_or(0);
        total_samples += 1;
        storage.set(&StorageKey::TotalSamples, &total_samples);

        let sample = Sample {
            seller: seller.clone(),
            price,
            ipfs_hash: ipfs_hash.clone(),
            title: title.clone(),
            bpm,
            genre: genre.clone(),
            id: total_samples,
            total_sales: 0,
            is_active: true,
        };

        storage.set(&StorageKey::Sample(total_samples), &sample);
        let mut user_samples: Vec<u32> = storage
            .get(&StorageKey::UserSamples(seller.clone()))
            .unwrap_or(vec![&env]);
        user_samples.push_front(total_samples);

        storage.set(&StorageKey::UserSamples(seller.clone()), &user_samples);

        total_samples
    }
}
