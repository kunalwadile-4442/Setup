/* eslint-disable no-useless-escape */
export const App_url = {
  image: {
    info: `${window.location.origin}/assets/icons/info.png`,
    applogo: `${window.location.origin}/assets/icons/applogo.png`,
    backgroundImage: `${window.location.origin}/assets/icons/bg.webp`,
    arrowleft: `${window.location.origin}/assets/icons/arrowleft.png`,
  },
  link: {
    INITIAL_URL: "/",
    DASHBOARD: "/dashboard",
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    CHANGE_PASSWORD: "/change-password",
    PROFILE: "/profile",
    SETTINGS: "/settings",
    ADMIN_PROFILE: '/profile/admin',
    USER_PROFILE: '/profile/user'
  },
  permission: {
    ADMIN: "admin",
    USER: "user",
  } as const,
};

export const bgColors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
];

import {  BarChart2, Settings, Users } from "lucide-react";
import type { SidebarItem } from "../Types/types";



export const sidebarContent: SidebarItem[] = [
  {
    title: "Dashboard",
    route: App_url.link.DASHBOARD,
    icon: BarChart2,
    roles: [App_url.permission.ADMIN, App_url.permission.USER],
  },
  {
    title: "Profile",
    route: App_url.link.PROFILE,
    icon: Users,
    roles: [App_url.permission.ADMIN],
    children: [
      {
        title: "Admin",
        icon: Users,
        route: App_url.link.ADMIN_PROFILE,
        roles: [App_url.permission.ADMIN],
      },
      {
        title: "Users",
        icon: Users,
        route: App_url.link.USER_PROFILE,
        roles: [App_url.permission.ADMIN, App_url.permission.USER],
      },
    ],
  },
  
    
  {
    title: "Settings",
    route: App_url.link.SETTINGS,
    icon: Settings,
    roles: [App_url.permission.ADMIN, App_url.permission.USER],
  },
];

interface Quote {
  id: number;
  quote: string;
  author: string;
}
export const quotesDB: Quote[] = [
  {
    id: 1,
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    id: 2,
    quote:
      "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
  },
  {
    id: 3,
    quote:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    id: 4,
    quote: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde",
  },
  {
    id: 5,
    quote:
      "If debugging is the process of removing bugs, then programming must be the process of putting them in.",
    author: "Edsger W. Dijkstra",
  },
  {
    id: 6,
    quote: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs",
  },
  {
    id: 7,
    quote: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
  },
  {
    id: 8,
    quote: "Clean code always looks like it was written by someone who cares.",
    author: "Robert C. Martin",
  },
  {
    id: 9,
    quote:
      "One of my most productive days was throwing away 1000 lines of code.",
    author: "Ken Thompson",
  },
  {
    id: 10,
    quote: "Code is like humor. When you have to explain it, it’s bad.",
    author: "Cory House",
  },
];
