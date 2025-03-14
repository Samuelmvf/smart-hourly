import { CreateProfessionalInformationRequest } from "./requests";

export type ProfessionalInformationResponse = CreateProfessionalInformationRequest & {
  createdAt: string;
};
