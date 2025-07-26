import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { setDropdownOpen, toggleDropdown } from "../routes/Redux/ui/uiSlice";


interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  optionClassName?: string; // Optional className for options
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  onChange,
  options,
  className = "",
  placeholder = "",
  optionClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative w-full  ${className}`}>
      <button
        type="button"
        className="w-full border-[1px] border-gray-300 rounded px-4 py-2 flex justify-between items-center text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
        onClick={() => setIsOpen((prev) => !prev)}
      >
      <span className="flex-1 text-left">{selectedOption ? selectedOption.label : placeholder}</span>
<span className="pl-3 ml-3 border-l border-gray-300 flex items-center">
  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
</span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-[1px] w-full border-b-[1px] bg-white border border-gray-300 rounded shadow-md">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-4 h-10 flex items-center hover:bg-primaryLight text-[15px]  cursor-pointer ${
                value === option.value ? "bg-primaryVeryLight" : ""
              } ${optionClassName ?? ""}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
