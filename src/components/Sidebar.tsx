import { useLocation, useNavigate } from "react-router-dom";
import { App_url, sidebarContent } from "../utils/constants/static";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { showConfirmPopup, hideConfirmPopup } from "../Redux/ui/uiSlice";
import ConfirmModalPopup from "../components/modal/ConformationPopup";
import { useState } from "react";
import type { SidebarProps } from "../utils/Types/types";

const Sidebar: React.FC<SidebarProps> = ({ role, isSidebarOpen }) => {
  const loc = useLocation();
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const confirmPopupOpen = useAppSelector(
    (state) => state.ui.isConfirmPopupOpen
  );

  const handleLogout = () => {
    dispatch(showConfirmPopup());
  };

  const handleConfirmDelete = () => {
    dispatch(hideConfirmPopup());
    nav(App_url.link.LOGIN);
  };

  return (
    <>
      <div
        className={`bg-white border-r fixed h-full transition-all duration-300 ${
          isSidebarOpen ? "w-56" : "w-20"
        }`}
      >
        <div className="p-4">
          <a href="/">
            <img
              src="/logo.png"
              alt="Logo"
              className={`transition-all duration-200 ${
                isSidebarOpen ? "w-full" : "w-8 mx-auto"
              }`}
            />
          </a>
        </div>
        <nav className="mt-4 space-y-1">
          {sidebarContent
            .filter((item) => item.roles.includes(role))
            .map((item) => {
              const isActive = loc.pathname.startsWith(item.route || "");
              const Icon = item.icon;
              const isOpen =
                openMenus.includes(item.title) ||
                (item.children &&
                  item.children.some((child) =>
                    loc.pathname.startsWith(child.route || "")
                  ));
              if (item.children) {
                return (
                  <div key={item.title}>
                    {/* Parent menu item */}
                    <div
                      onClick={() => toggleMenu(item.title)}
                      className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg cursor-pointer border-l-4 transition-all 
              ${
                isOpen
                  ? "bg-primaryLight border-primary"
                  : "hover:bg-primaryLight "
              }`}
                    >
                      {Icon && <Icon size={18} />}
                      {isSidebarOpen && <span>{item.title}</span>}
                    </div>

                    {/* Submenu items */}
                    <div
                      className={`ml-6 mt-1 space-y-1 transition-all overflow-hidden ${
                        isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.children
                        .filter((child) => child.roles.includes(role))
                        .map((child, index) => {
                          const ChildIcon = child.icon;

                          return (
                            <div
                              className="relative pl-6 group"
                              key={child.route}
                            >
                              {/* Vertical line on the left */}
                              <span className="absolute left-2 top-0 bottom-0 w-px bg-gray-300" />

                              {/* Horizontal connector (dot or bar) */}
                              <span className="absolute left-2.5 top-3 w-2 h-px bg-gray-400" />

                              <div
                                onClick={() => nav(child.route!)}
                                className={`flex items-center border-l-4 gap-2 py-1 cursor-pointer text-sm hover:bg-primaryLight mr-2 pl-2 rounded-md ${
                                  loc.pathname.startsWith(child.route!)
                                    ? "bg-primaryLight"
                                    : ""
                                }`}
                              >
                                {ChildIcon && <ChildIcon size={14} />}
                                {child.title}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              }

              // For non-parent items
              return (
                <div
                  key={item.route}
                  onClick={() => nav(item.route)}
                  className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg cursor-pointer border-l-4 transition-all ${
                    isActive
                      ? "bg-primaryLight border-primary text-gray-800"
                      : "hover:bg-primaryLight border-transparent"
                  }`}
                >
                  <Icon size={18} />
                  {isSidebarOpen && <span>{item.title}</span>}
                </div>
              );
            })}
        </nav>

        <div
          onClick={handleLogout}
          className={`absolute bottom-2 left-0 right-0 flex items-center px-4 py-2 mb-1 rounded-lg hover:bg-red-100 cursor-pointer mx-2 text-red-600 border-l-4 border-red-200 hover:border-red-600 ${
            isSidebarOpen ? "gap-3 justify-start" : "justify-center"
          }`}
        >
          <span className="mr-1">🚪</span>
          {isSidebarOpen && <span>Logout</span>}
        </div>
      </div>
      <ConfirmModalPopup
        show={confirmPopupOpen}
        title="Are you sure?"
        description="Do you really want to delete this task? This action cannot be undone."
        buttonSuccess="Delete"
        buttonCancel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => dispatch(hideConfirmPopup())}
      />
    </>
  );
};

export default Sidebar;
