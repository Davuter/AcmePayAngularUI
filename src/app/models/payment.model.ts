import { IPaymentItem } from "./paymentItem.model";

export interface IPayments {
  transactions: IPaymentItem[];
  totalcount: number;
}
