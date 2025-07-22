import { App_url } from "../constants/static";
import apiClient from "./apiClient";
import type { SubmissionPayload } from "../Types/projectInquiry.types";


export const submitProjectInquiry = async (payload: SubmissionPayload): Promise<any> => {
  return await apiClient.post<any>(App_url.Api.projectInquiryApi, payload);
};