export interface SidebarItem {
  title: string;
  route: string;
  icon: LucideIcon;
  roles: Role[];
  children?: SidebarItem[]; // ✅ Allow nested children
}

export type Role = (typeof App_url.permission)[keyof typeof App_url.permission];

export interface User {
  name: string;
  role: Role;
}

export interface SidebarProps {
  role: Role;
  isSidebarOpen: boolean;
}

export interface FormField {
  type: "text" | "textarea" | "dropdown" | "checkbox" | "phone";
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[]; // For dropdown
  className?: string;
  rows?: number;
  rules?: any;
}

export interface FormComponentProps {
  fields: FormField[];
  control: any;
  register?: any;
  errors?: any;
  onSubmit: (data: any) => void;
  editMode?: boolean;
  submitLabel?: string;
  editLabel?: string;
}
export interface IPhoneInput {
  label?: string;
  name: string;
  required?: boolean;
  control: any;
  defaultValue?: any;
  rules?: any;
  className?: string;
  error?: any; // Error object for validation
}

export interface IRegisterPayload {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  username: string;
  role: Role;
  isLogin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IData {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResponse {
  statusCode: number;
  data: IData;
  message: string;
  success: boolean;
}

export interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLogin: boolean;
  passwordEmail: string
}

export interface IForgotPasswordPayload{
  email: string
}
export interface IVerifyOtpPayload {
 email: string;
 resetOTP: string;
}

export interface IResetPasswordPayload {
  email: string;
  newPassword: string;
  confirmPassword: string;
}