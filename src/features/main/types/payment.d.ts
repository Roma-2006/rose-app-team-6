export type PaymentMethod = 'CASH_ON_DELIVERY' | 'CREDIT_CARD';
export interface ICreateOrderPayload {
  addressId: string;
  paymentMethod: PaymentMethod;
  couponCode?: string;
}

export interface IOrder {
  id: string;
  status: string;
  paymentStatus?: string;
}

export interface ICreatePaymentIntentPayload {
  orderId: string;
}

export interface ICreatePaymentIntentResponse {
  paymentIntentId: string;
  clientSecret: string;
}

export interface IConfirmPaymentPayload {
  paymentIntentId: string;
  paymentMethodId: string;
}
