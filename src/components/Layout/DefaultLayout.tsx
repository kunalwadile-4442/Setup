import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { App_url} from "../../utils/constants/static";
import type { IUser, User} from "../../utils/Types/types"
import { useAppSelector } from "../../app/hooks";
import type { RootState } from "../../app/store";

const DefaultLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isActive, setIsActive] = useState(true);


     const user = useAppSelector((state: RootState)=> state.auth.user)
     const role = useAppSelector((state) => state.auth.user?.role) 
    console.log("role::",role);


    const headerUser = user
    ? { name: user.username, role: user.role }
    : undefined;


  // const user: User = {
  //   name: "John Doe",
  //   role: App_url.permission.ADMIN, // ✅ Fully type-safe!
  // };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
    setIsActive((prev) => !prev);
  };

  return (
    <div className="flex w-full h-screen">
      <Sidebar role={role} isSidebarOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col ${isSidebarOpen ? "ml-56" : "ml-20"}`}>
        <Header toggleSidebar={toggleSidebar} isActive={isActive} user={headerUser} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
