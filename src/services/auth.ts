import { AxiosResponse } from 'axios';
import { LoginRequest, LoginResponse, RegisterRequest } from '../interfaces/auth';
import Instance from './instance';

export function login(params: LoginRequest): Promise<LoginResponse> {
  return Instance.post(`api/Catalog/User/login`, params);
}
export function loginVendor(params: LoginRequest): Promise<LoginResponse> {
  return Instance.post(`api/login`, params);
}
export function register(params: RegisterRequest): Promise<AxiosResponse> {
  return Instance.post(`api/Catalog/User/Register`, params);
}
export function searchproduct(
  sortByName: boolean,
  sortByPrice: boolean,
  keyword: string,
): Promise<any> {
  return Instance.get(
    `api/ListProduct?CategoryID=1&SortName=${sortByName}&SortPrice=${sortByPrice}&Search=${keyword}`,
  );
}
