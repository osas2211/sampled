use soroban_sdk::{contracttype, Address, String};

#[contracttype]
#[derive(Clone)]
pub struct Sample {
    pub id: u32,
    pub seller: Address,
    pub price: i128,
    pub ipfs_link: String,
    pub title: String,
    pub bpm: u32,
    pub genre: String,
    pub total_sales: u32,
    pub is_active: bool,
}

#[contracttype]
#[derive(Clone)]
pub struct Purchase {
    pub buyer: Address,
    pub sample_id: u32,
    pub price_paid: i128,
    pub timestamp: u64,
}
