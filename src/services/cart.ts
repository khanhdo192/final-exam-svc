import { AxiosResponse } from 'axios';
import { AddToCartRequest, CartResponse, updateCartRequest } from '../interfaces/auth';
import Instance from './instance';

export function getCart(): Promise<CartResponse> {
  return Instance.get('api/Catalog/ShoppingCart');
}
export function addToCart(params: AddToCartRequest): Promise<AxiosResponse> {
  return Instance.post('api/Catalog/ShoppingCart', params);
}
export function updateCart(params: updateCartRequest): Promise<AxiosResponse> {
  return Instance.put(`api/Catalog/ShoppingCart/${params.CartId}?quantity=${params.Quantity}`);
}
export function removeCart(params: number): Promise<AxiosResponse> {
  return Instance.delete(`api/Catalog/ShoppingCart/${params}`);
}
