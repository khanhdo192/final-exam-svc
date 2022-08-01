import { AxiosResponse } from 'axios';
import { LoginRequest, LoginResponse, RegisterRequest } from '../interfaces/auth';
import Instance from './instance';

export function login(params: LoginRequest): Promise<LoginResponse> {
  return Instance.post(`api/Catalog/User/login`, params);
}
export function loginVendor(params: LoginRequest): Promise<LoginResponse> {
  return Instance.post(`api/Vendor/Login`, params);
}
export function register(params: RegisterRequest): Promise<AxiosResponse> {
  return Instance.post(`api/Catalog/User/Register`, params);
}
