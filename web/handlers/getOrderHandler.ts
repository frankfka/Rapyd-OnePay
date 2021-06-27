import Merchant from '../models/Merchant';
import Order from '../models/Order';
import { databaseService } from '../services/database/databaseService';

export type GetOrderRequest = {
  orderId: string;
};

export type GetOrderResponse = Order & {
  merchant: Merchant;
};

/*
Handles GET /orders/{orderId} requests
 */
const getOrderHandler = async (
  request: GetOrderRequest
): Promise<GetOrderResponse> => {
  console.log('Handling get order with request', request);

  // Fetch order DB data
  const orderData = await databaseService.getOrder(request.orderId);
  if (!orderData) {
    throw Error('Unable to fetch order with given ID');
  }

  // Fetch the merchant
  const merchantData = await databaseService.getMerchant(orderData.merchantId);
  if (!merchantData) {
    throw Error(
      'Unable to fetch merchant with given ID: ' + orderData.merchantId
    );
  }

  const response: GetOrderResponse = {
    ...orderData,
    merchant: merchantData,
  };

  console.log('Finished handling get order with response', response);
  return response;
};

export default getOrderHandler;
