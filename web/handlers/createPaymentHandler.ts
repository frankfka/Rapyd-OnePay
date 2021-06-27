import PaymentType from '../models/PaymentType';
import { databaseService } from '../services/database/databaseService';
import { rapydApiService } from '../services/rapyd/rapydApiService';

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

/*
Handles POST /payment requests
 */
const createPaymentHandler = async (
  request: CreatePaymentRequest
): Promise<CreatePaymentResponse> => {
  console.log('Handling create payment with request', request);

  // Fetch merchant
  const merchantData = await databaseService.getMerchant(request.merchantId);
  if (!merchantData) {
    throw Error('Unable to fetch merchant with given ID ' + request.merchantId);
  }

  const { amount, currency, selectedPaymentType, selectedPaymentId } = request;

  const paymentResponse: CreatePaymentResponse = {
    paymentType: selectedPaymentType,
    paymentId: '',
  };

  // Switch based on payment type
  switch (selectedPaymentType) {
    case 'rapyd':
      // Handle eWallet transfers
      const eWalletTransferResult = await rapydApiService.transferWalletFunds(
        selectedPaymentId,
        merchantData.eWalletId,
        amount,
        currency
      );
      console.log('Create wallet transfer result', eWalletTransferResult);
      paymentResponse.paymentId = eWalletTransferResult.paymentId;
      break;

    case 'standard':
      // Handle card payment
      const standardPaymentResult = await rapydApiService.createPayment(
        selectedPaymentId,
        merchantData.eWalletId,
        amount,
        currency
      );
      console.log('Create card payment result', standardPaymentResult);
      paymentResponse.paymentId = standardPaymentResult.paymentId;
      break;
  }

  // Check payment ID
  if (!paymentResponse.paymentId) {
    throw Error('No payment ID after handling payment creation');
  }

  console.log('Payment completed with result', paymentResponse);

  return paymentResponse;
};

export default createPaymentHandler;
