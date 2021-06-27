import { databaseService } from '../services/database/databaseService';
import { rapydApiService } from '../services/rapyd/rapydApiService';
import Customer from '../models/Customer';
import { RapydWallet } from '../services/rapyd/models/RapydWallet';
import { RapydPaymentMethod } from '../services/rapyd/models/RapydPaymentMethod';

export type GetCustomerRequest = {
  customerId: string;
};

export type GetCustomerResponse = Customer & {
  eWallet: RapydWallet;
  paymentMethods: RapydPaymentMethod[];
};

/*
Handles GET /customer/{customerId} requests
 */
const getCustomerHandler = async (
  request: GetCustomerRequest
): Promise<GetCustomerResponse> => {
  console.log('Handling get customer with request', request);

  // Fetch customer DB data
  const customerData = await databaseService.getCustomer(request.customerId);
  if (!customerData) {
    throw Error('Unable to fetch customer with given ID');
  }

  // Fetch Rapyd customer data
  const rapydCustomerData = await rapydApiService.retrieveCustomer(
    customerData.rapydCustomerId
  );
  const customerRapydWalletData = await rapydApiService.retrieveRapydWallet(
    rapydCustomerData.rapydWalletId
  );

  console.log(
    'Retrieved additional data from Rapyd',
    rapydCustomerData,
    customerRapydWalletData
  );

  const response = {
    ...customerData,
    eWallet: customerRapydWalletData,
    paymentMethods: rapydCustomerData.paymentMethods,
  };

  console.log('Finished handling get customer with response', response);
  return response;
};

export default getCustomerHandler;
