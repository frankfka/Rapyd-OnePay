import {
  CreatePaymentRequest,
  CreatePaymentResponse,
  GetCustomerResponse,
  GetMerchantResponse,
  GetOrderResponse,
} from '../models/ApiModels';
import Cost from '../models/Cost';
import PaymentType from '../models/PaymentType';

class ApiService {
  private readonly baseEndpoint =
    'https://rapyd-one-checkout-web.vercel.app/api';

  async getMerchantDetails(merchantId: string): Promise<GetMerchantResponse> {
    return this.get<GetMerchantResponse>(`/merchants/${merchantId}`);
  }

  async getOrderDetails(orderId: string): Promise<GetOrderResponse> {
    return this.get<GetOrderResponse>(`/orders/${orderId}`);
  }

  async getCustomerDetails(customerId: string): Promise<GetCustomerResponse> {
    return this.get<GetCustomerResponse>(`/customers/${customerId}`);
  }

  async createPayment(
    customerId: string,
    merchantId: string,
    totalCost: Cost,
    selectedPaymentId: string,
    selectedPaymentType: PaymentType
  ): Promise<CreatePaymentResponse> {
    const request: CreatePaymentRequest = {
      amount: totalCost.amount,
      currency: totalCost.currency,
      customerId,
      merchantId,
      selectedPaymentId,
      selectedPaymentType,
    };

    console.log('Creating payment with request', request);

    return this.post<CreatePaymentResponse>('/payment', request);
  }

  private async get<ResponseType>(endpoint: string): Promise<ResponseType> {
    const response = await fetch(this.baseEndpoint + endpoint);
    const jsonResponse = await response.json();
    return jsonResponse as ResponseType;
  }

  private async post<ResponseType>(
    endpoint: string,
    data: any
  ): Promise<ResponseType> {
    const response = await fetch(this.baseEndpoint + endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const jsonResponse = await response.json();

    return jsonResponse as ResponseType;
  }
}

const apiService = new ApiService();

export default apiService;
