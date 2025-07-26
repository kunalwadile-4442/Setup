import { App_url } from "../constants/static";
import apiClient from "./apiClient";
import { toast } from "react-toastify";
import type { IRegisterPayload, ILoginPayload, IVerifyOtpPayload, IResetPasswordPayload, IForgotPasswordPayload } from "../Types/types";



// ✅ Register API with toast
export const RegisterApi = async (data: IRegisterPayload) => {
  try {
    const response = await apiClient.post(App_url.ApiEndPoint.REGISTER, data);
    toast.success(response.data.message);
    return response;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Registration failed!");
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
    toast.error(error.response?.data?.message || "Login failed!");
    throw error;
  }
};

export const LogoutApi = async () => {
  try {
    const response = await apiClient.post(App_url.ApiEndPoint.LOGOUT);
    toast.success(response.data.message);
    return response;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Logout failed!");
    throw error;
  }
};

export const ForgotPasswordApi = async (payload: IForgotPasswordPayload) => {
  console.log("payload", payload);
  try {
    const response = await apiClient.post(App_url.ApiEndPoint.FORGOT_PASSWORD,  payload);
    toast.success(response.data.message);
    return response;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "User Not Found!");
    throw error;
  }
} 

export const VerifyOtpApi = async (payload: IVerifyOtpPayload) => {
  try {
    const response = await apiClient.post(App_url.ApiEndPoint.VERIFY_OTP, payload);
    toast.success(response.data.message);
    return response;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "invalid otp!");
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
    toast.error(error.response?.data?.message || "Logout failed!");
    throw error;
  }
};