import { CheckoutRequest, CheckoutResponse, OrderResponse } from '../interfaces/auth';
import Instance from './instance';

export function checkout(params: CheckoutRequest): Promise<CheckoutResponse> {
  return Instance.post(`api/catalog/order`, params);
}
export function getOrder(params: number): Promise<OrderResponse> {
  return Instance.get(`api/catalog/orderdetail?orderId=${params}`);
}
