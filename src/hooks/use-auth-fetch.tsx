// src/hooks/use-auth-fetch.ts
"use client";

import { RequestOptions, httpClient } from "@/lib/http-client";
import { useAuth } from "@clerk/nextjs";

export function useAuthFetch() {
  const { getToken } = useAuth();

  return {
    get: async <T,>(endpoint: string, options?: RequestOptions): Promise<T> => {
      const authToken = await getToken();
      const response = await httpClient.get(endpoint, authToken as string, options);
      return response.json();
    },

    post: async <T,>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> => {
      const authToken = await getToken();
      const response = await httpClient.post(endpoint, authToken as string, data, options);

      const contentLength = response.headers.get("Content-Length");
      if (!contentLength || contentLength === "0") {
        return {} as T;
      }

      return response.json();
    },

    put: async <T,>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> => {
      const authToken = await getToken();
      const response = await httpClient.put(endpoint, authToken as string, data, options);
      return response.json();
    },

    delete: async <T,>(endpoint: string, options?: RequestOptions): Promise<T> => {
      const authToken = await getToken();
      const response = await httpClient.delete(endpoint, authToken as string, options);
      return response.json();
    },

    patch: async <T,>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> => {
      const authToken = await getToken();
      const response = await httpClient.patch(endpoint, authToken as string, data, options);
      return response.json();
    },
  };
}
