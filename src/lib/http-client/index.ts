import { httpClientFetch } from "./fetch";

export type RequestOptions = RequestInit & {
  params?: Record<string, string>;
};

const clients = {
  fetch: httpClientFetch,
};

const defaultClientType = "fetch";

export const httpClient = clients[defaultClientType];
