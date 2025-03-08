import { httpClientFetch } from "./fetch";

export interface HttpClient {
  get: <T>(endpoint: string, options?: any) => Promise<T>;
  post: <T>(endpoint: string, data?: any, options?: any) => Promise<T>;
  put: <T>(endpoint: string, data?: any, options?: any) => Promise<T>;
  delete: <T>(endpoint: string, options?: any) => Promise<T>;
  patch: <T>(endpoint: string, data?: any, options?: any) => Promise<T>;
}

type HttpClientType = "fetch";

const clients: Record<string, HttpClient> = {
  fetch: httpClientFetch,
};

const defaultClientType: HttpClientType = "fetch";

export const httpClient = clients[defaultClientType];
