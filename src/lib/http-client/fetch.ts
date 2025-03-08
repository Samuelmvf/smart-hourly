import { useAuth } from "@clerk/nextjs";
import { HttpClient } from ".";

type RequestOptions = RequestInit & {
  params?: Record<string, string>;
};

async function apiFetch<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  const { getToken } = useAuth();
  const authToken = await getToken();

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

  const response = await fetch(url.toString(), {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.text().catch(() => "Unknown error");
    throw new Error(error);
  }

  return response.json();
}

export const httpClientFetch: HttpClient = {
  get: <T>(endpoint: string, options?: RequestOptions) => apiFetch<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) => apiFetch<T>(endpoint, { ...options, method: "DELETE" }),

  patch: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),
};
