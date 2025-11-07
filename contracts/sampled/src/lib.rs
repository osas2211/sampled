#![no_std]
use soroban_sdk::{contract, contractimpl, log, Address, Env};

mod data_structures;
mod error;
mod storage_key;

use storage_key::StorageKey;

#[contract]
pub struct Sampled {}

#[contractimpl]
impl Sampled {
    pub fn __constructor(env: Env, platform_fee: u32, plaform_address: Address) {
        let storage = env.storage().instance();
        if storage.has(&StorageKey::PlatformAddress) {
            panic!("Contract already exists");
        }

        storage.set(&StorageKey::PlatformAddress, &plaform_address);
        storage.set(&StorageKey::PlaformFee, &platform_fee);
        storage.set(&StorageKey::TotalSamples, &0u32);
        storage.set(&StorageKey::TotalVolume, &0i128);

        log!(
            &env,
            "Sample contract deployed with {}% plaform fee",
            platform_fee
        );
    }
}
