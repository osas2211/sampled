use soroban_sdk::{contracttype, Address};

#[contracttype]
#[derive(Debug, Clone)]
pub enum StorageKey {
    Sample(u32),
    Purchase(Address, u32),
    UserSamples(Address),
    Earnings(Address),
    UserPurchases(Address),
    PlaformFee,
    TotalSamples,
    PlatformAddress,
    TotalVolume,
}
