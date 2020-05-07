export interface ITransferContent {
    account: {
        accountBusinessId: string,
        balanceInHundredScale: number,
        currency: string,
        id: number
    },
    amountInHundredScale: number,
    from: string,
    id: number,
    message: string,
    to: string,
    transferDateTime: Date,
    transferType: string,
    zone: string
}
