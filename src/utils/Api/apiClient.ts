// src/api/apiClient.ts
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_APP_ENDPOINT_URL;
console.log('BASE_URL:', BASE_URL);

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

interface RequestOptions {
  params?: Record<string, any>;
  data?: Record<string, any>;
  headers?: Record<string, string>;
}

const request = async <T = any>(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  url: string,
  options: RequestOptions = {}
): Promise<AxiosResponse<T>> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      params: options.params,
      data: options.data,
      headers: options.headers,
    };

    const response: AxiosResponse<T> = await instance(config);
    return response; // ✅ FULL RESPONSE
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const handleError = (error: any): never => {
  const message =
    error.response?.data?.message ||
    error.response?.data ||
    error.message ||
    'Unknown error';

  console.error('[API Error]:', message);
  throw new Error(message);
};

const apiClient = {
  get: <T = any>(url: string, params?: Record<string, any>) =>
    request<T>('get', url, { params }),

  post: <T = any>(url: string, data?: Record<string, any>) =>
    request<T>('post', url, { data }),

  put: <T = any>(url: string, data?: Record<string, any>) =>
    request<T>('put', url, { data }),

  delete: <T = any>(url: string, params?: Record<string, any>) =>
    request<T>('delete', url, { params }),
};

export default apiClient;
