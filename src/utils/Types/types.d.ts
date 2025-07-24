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