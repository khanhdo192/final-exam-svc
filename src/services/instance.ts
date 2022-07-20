import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { history } from '../App';

const __DEV__ = process.env.NODE_ENV === 'development';

const Instance = Axios.create({
  timeout: 20000,
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    charset: 'utf-8',
  },

  paramsSerializer(params: { [x: string]: any }) {
    const searchParams = new URLSearchParams();
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(params)) {
      const param = params[key];
      if (param !== undefined) {
        if (Array.isArray(param)) {
          param.forEach((p, i) => {
            searchParams.append(`${key}[${i}]`, p);
          });
        } else {
          searchParams.append(key, param);
        }
      }
    }
    return searchParams.toString();
  },
});

Instance.interceptors.request.use(
  (requestConfig: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken') || null;
    if (accessToken) {
      const newConfig = {
        ...requestConfig,
        headers: { ...requestConfig.headers, Authorization: `Bearer ${accessToken}` },
      };
      return newConfig;
    }
    return requestConfig;
  },
  (error: any) => {
    if (__DEV__) {
      console.error('API Request Error:', error);
    }
    return Promise.reject(error);
  },
);

Instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error: { response: any; config?: any }) => {
    if (__DEV__) {
      console.error('API Response Error:', error);
    }
    const errorMessage = error?.response?.status;

    // TODO: handle refresh token
    if (errorMessage === 401) {
      history.push('/login');
    }

    if (errorMessage) {
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.reject(error);
  },
);

export default Instance;
