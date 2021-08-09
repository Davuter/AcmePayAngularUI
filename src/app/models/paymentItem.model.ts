export interface IPaymentItem {
    paymentId: string
    orderReferenceNumber: string
    amount: number
    currency: string
    cardHolderName: string
    cardPan: string
    cardExpirationMonth: number
    cardExpirationYea: number
    cardCvv: number
    status: number
  }
  