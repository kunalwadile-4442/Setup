export interface SidebarItem {
  title: string;
  route: string;
  icon: LucideIcon;
  roles: Role[];
  children?: SidebarItem[]; // ✅ Allow nested children
}

export type Role = (typeof App_url.permission)[keyof typeof App_url.permission];

export  interface User {
  name: string;
  role: Role;
}


export interface SidebarProps {
  role: Role;
  isSidebarOpen: boolean;
}

export interface FormField {
  type: 'text' | 'textarea' | 'dropdown' | 'checkbox' | 'phone';
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