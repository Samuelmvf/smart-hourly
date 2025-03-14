"use client";

import { useAuthFetch } from "@/hooks/use-auth-fetch";
import { CreateProfessionalInformationRequest } from "./requests";
import { ProfessionalInformationResponse } from "./responses";

// Create a custom hook for this service
export function useProfessionalInformationService() {
  const authFetch = useAuthFetch();

  return {
    getLastProfessionalInformation: () => authFetch.get<ProfessionalInformationResponse>("/professional-information"),

    createProfessionalInformation: (payload: CreateProfessionalInformationRequest) =>
      authFetch.post<void>("/professional-information", payload),
  };
}
