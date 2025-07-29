import { App_url } from "../constants/static";
import apiClient from "./apiClient";
import { toast } from "react-toastify";
import type {
  IRegisterPayload,
  ILoginPayload,
  IVerifyOtpPayload,
  IResetPasswordPayload,
  IForgotPasswordPayload,
} from "../Types/types";

// ✅ Register API with toast
export const RegisterApi = async (data: IRegisterPayload) => {
  try {
    const response = await apiClient.post(App_url.ApiEndPoint.REGISTER, data);
    toast.success(response.data.message);
    return response;
  } catch (error: any) {
    const errMsg = error?.message; 
    toast.error(errMsg || "Something went wrong");
    throw error;
  }
};

// ✅ Login API with toast
export const LoginApi = async (data: ILoginPayload) => {
  try {
    const response = await apiClient.post(App_url.ApiEndPoint.LOGIN, data);
    toast.success(response.data.message);
    return response;
  } catch (error: any) {
    const errMsg = error?.message; 
    toast.error(errMsg || "Something went wrong");
    throw error;
  }
};

export const LogoutApi = async () => {
  try {
    const response = await apiClient.post(App_url.ApiEndPoint.LOGOUT);
    toast.success(response.data.message);
    return response;
  } catch (error: any) {
    const errMsg = error?.message; 
    toast.error(errMsg || "Something went wrong");
    throw error;
  }
};

export const ForgotPasswordApi = async (payload: IForgotPasswordPayload) => {
  console.log("payload", payload);
  try {
    const response = await apiClient.post(
      App_url.ApiEndPoint.FORGOT_PASSWORD,
      payload
    );
    toast.success(response.data.message);
    return response;
  } catch (error: any) {
   const errMsg = error?.message; 
    toast.error(errMsg || "Something went wrong");
    throw error;
  }
};

export const VerifyOtpApi = async (payload: IVerifyOtpPayload) => {
  try {
    const response = await apiClient.post(
      App_url.ApiEndPoint.VERIFY_OTP,
      payload
    );
    toast.success(response.data.message);
    return response;
  } catch (error: any) {
   const errMsg = error?.message; 
    toast.error(errMsg || "Something went wrong");
    throw error;
  }
};

export const ResetPassword = async (payload: IResetPasswordPayload) => {
  try {
    const response = await apiClient.post(
      App_url.ApiEndPoint.RESET_PASSWORD,
      payload
    );
    toast.success(response.data.message);
    return response;
  } catch (error: any) {
    const errMsg = error?.message; 
    toast.error(errMsg || "Something went wrong");
    throw error;
  }
};

export const GetUserProfile = async () => {
  try {
    const response = await apiClient.get(
      App_url.ApiEndPoint.GET_USER_PROFILE
    );
    // toast.success(response.data.message);
    console.log("GetUserProfile",response.data.message)
    return response;
    
  } catch (error: any) {
    const errMsg = error?.message; 
    toast.error(errMsg || "Something went wrong");
    throw error;
  }
};

export const UpdateUserProfile = async (payload: any) => {
  try {
    const response = await apiClient.put(
      App_url.ApiEndPoint.UPDATE_USER_PROFILE,
      payload
    );
    toast.success(response.data.message);
    return response;
  } catch (error: any) {
    const errMsg = error?.message; 
    toast.error(errMsg || "Something went wrong");
    throw error;
  }
};

export const UpdateUserPassword = async (payload: any) => {
  try {
    const response = await apiClient.patch(
      App_url.ApiEndPoint.UPDATE_USER_PASSWORD,
      payload
    );
    toast.success(response.data.message);
    return response;
  } catch (error: any) {
    const errMsg = error?.message; 
    toast.error(errMsg || "Something went wrong");
    throw error;
  }
};