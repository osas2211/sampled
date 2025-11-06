#[soroban_sdk::contracterror]
#[derive(Debug, Clone, Copy)]
pub enum Error {
    NotAuthorized = 1,
    SampleNotFound = 2,
    InsufficientPayment = 3,
    AlreadyPurchased = 4,
    InvalidPrice = 5,
    WithdrawFailed = 6,
}
