import { RequestOptions } from ".";

async function apiFetch(endpoint: string, authToken: string, options: RequestOptions = {}): Promise<Response> {
  const { params, ...fetchOptions } = options;

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const headers = new Headers(fetchOptions.headers);
  headers.set("Authorization", `Bearer ${authToken}`);

  if (!headers.has("Content-Type") && !(fetchOptions.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(url.toString(), {
    ...fetchOptions,
    headers,
  });
}

export const httpClientFetch = {
  get: (endpoint: string, authToken: string, options?: RequestOptions) => apiFetch(endpoint, authToken, { ...options, method: "GET" }),

  post: (endpoint: string, authToken: string, data: any, options?: RequestOptions) =>
    apiFetch(endpoint, authToken, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: (endpoint: string, authToken: string, data: any, options?: RequestOptions) =>
    apiFetch(endpoint, authToken, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: (endpoint: string, authToken: string, options?: RequestOptions) =>
    apiFetch(endpoint, authToken, { ...options, method: "DELETE" }),

  patch: (endpoint: string, authToken: string, data: any, options?: RequestOptions) =>
    apiFetch(endpoint, authToken, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),
};
