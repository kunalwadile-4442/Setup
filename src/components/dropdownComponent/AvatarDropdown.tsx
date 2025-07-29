import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { App_url, bgColors } from "../../utils/constants/static";
import { useNavigate } from "react-router-dom";

interface DropdownOption {
  label: string;
  value: string;
}

interface AvatarDropdownProps {
  name: string;
  options?: DropdownOption[];
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({
  name,

  options = [
    { label: "Profile", value: App_url.link.PROFILE }
  ],
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigation = useNavigate();

  const randomBg = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
  }, []);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative " ref={dropdownRef}>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div
          className={`${randomBg} hover:bg-gray-400 hover:text-gray-900 hover:border text-white rounded-full h-9 w-9 flex items-center justify-center text-sm font-bold`}
        >
          {initials}
        </div>
        <p className="text-sm">{name}</p>
        <ChevronDown size={16} />
      </div>

      {open && (
       <ul
  className={`absolute right-0 mt-2 bg-white border rounded-md shadow-md w-40 z-50 origin-top transform overflow-hidden transition-all duration-300 ease-in-out
    ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}
  `}
>
  {options.map((opt) => (
    <li
      key={opt.value}
      onClick={() => {
        navigation(opt.value);
        setOpen(false);
      }}
      className={`px-4 py-2 hover:bg-primaryLight cursor-pointer text-sm ${
        opt.value === "logout" ? "text-red-500" : ""
      }`}
    >
      {opt.label}
    </li>
  ))}
</ul>
      )}
    </div>
  );
};

export default AvatarDropdown;
