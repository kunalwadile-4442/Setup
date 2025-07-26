import { Menu } from "lucide-react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import AvatarDropdown from ".././components/dropdownComponent/AvatarDropdown"; // <- Adjust path as needed
import { useAppSelector } from "../app/hooks";

interface HeaderProps {
  toggleSidebar: () => void;
  isActive: boolean;

  user?: {
    name: string;
    role: "admin" | "user";
  };
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isActive, user }) => {
// 1srt letter capitalization user.name 
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const name = user ? capitalizeFirstLetter(user.name) : "Guest";
  




  const replacedPath = useMemo(() => {
    const path = location.pathname.split("/")[1] || "Dashboard";
    return path.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }, [location.pathname]);

  return (
    <header className="h-14 flex items-center justify-between bg-white px-4 shadow z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <Menu size={18} />
        </button>
        <p className="font-semibold text-lg">{replacedPath}</p>
      </div>

      {user && <AvatarDropdown name={name} />}
    </header>
  );
};

export default Header;
