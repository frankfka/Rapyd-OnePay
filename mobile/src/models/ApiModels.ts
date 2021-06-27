import { Cart } from './Cart';
import Merchant from './Merchant';
import { RapydPaymentMethod } from './RapydPaymentMethod';
import PaymentType from './PaymentType';
import Customer from './Customer';
import { RapydWallet } from './RapydWallet';

export type GetCustomerResponse = Customer & {
  eWallet: RapydWallet;
  paymentMethods: RapydPaymentMethod[];
};

export type GetMerchantResponse = Omit<Merchant, 'id'> | undefined;

export type GetOrderResponse = {
  tipEnabled: boolean;
  merchantId: string;
  merchant: Omit<Merchant, 'id'>;
  items: Cart;
};

export type CreatePaymentRequest = {
  customerId: string;
  merchantId: string;
  selectedPaymentType: PaymentType;
  selectedPaymentId: string;
  amount: number;
  currency: string;
};

export type CreatePaymentResponse = {
  paymentId: string;
  paymentType: PaymentType;
};
