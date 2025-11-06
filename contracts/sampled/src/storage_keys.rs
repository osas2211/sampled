use soroban_sdk::{contracttype, Address};

#[contracttype]
#[derive(Debug, Clone)]
pub enum StorageKeys {
    Sample(u32),
    Puchase(Address, u32),
    UserSamples(Address),
    Earnings(Address),
    PlaformFee,
    TotalSamples,
    PlatformAddress,
    TotalVolume,
}
