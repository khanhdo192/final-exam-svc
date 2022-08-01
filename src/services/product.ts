import { AxiosResponse } from 'axios';
import { HomepageRequest } from '../interfaces/auth';
import Instance from './instance';

export function getProductByCategory(params: string): Promise<AxiosResponse> {
  return Instance.get(`api/Catalog/Home/${params}`);
}
export function homepageproduct(): Promise<HomepageRequest> {
  return Instance.get(`api/Catalog/HomePage`);
}
export function catalogproduct(): Promise<any> {
  return Instance.get(`api/ListProduct?CategoryID=1`);
}
export function productdetail(params: string | undefined): Promise<any> {
  return Instance.get(`api/ProductCatalog/${params}`);
}
export function searchproduct(
  sortByName: string,
  sortByPrice: string,
  keyword: string,
  page: number,
): Promise<any> {
  return Instance.get(
    `api/ListProduct?CategoryID=1&SortName=${sortByName}&SortPrice=${sortByPrice}&Search=${keyword}&PageIndex=${page}`,
  );
}
