import { useState } from "react";
import SpinnerSm from "../loader/SpinnerSm";

type IButtonTypes = {
  label?: any;
  className?: string;
  onClick?: any;
  to?: string;
  type?: "submit" | "reset" | "button" | undefined;
  icon?: any;
  state?: any;
  disabled?: boolean;
  isLoading?: boolean;
  spinnerColor?: string;
  spinnerClassName?: string;
};
const Button = (prop: IButtonTypes) => {
  const [disabled, setDisabled] = useState(false);
  const onClick = (e:any) => {
    if (prop?.onClick) {
      setDisabled(true);
      if (!prop.disabled && !prop.isLoading) {
        prop?.onClick(e);
      }
      setTimeout(() => setDisabled(false), 500);
    }
   
  };
  return (
    <button
      disabled={prop.disabled || disabled}
      type={`${prop.type ? prop.type : "button"}`}
      className={`${
        prop.className
      } py-1 px-3  text-sm   transition-colors duration-300  hover:darken-on-hover ${
        !prop.disabled
          ? prop?.className?.includes("hover:bg")
            ? ""
            : "hover:bg-primary-100"
          : ""
      }`}
      // onClick={!prop.disabled && prop.onClick}
      // style={{whiteSpace: "nowrap"}}
      onClick={onClick}
    >
      <div className="flex justify-center items-center gap-2">
        {prop.icon && (
          <img src={prop.icon} className="h-3 text-primary" alt="" />
        )}
        {prop.label && <p
        >
          {prop.label}
        </p>}
        {prop.isLoading &&<div className={`${prop?.spinnerClassName || "h-auto w-auto "}`}>
        <SpinnerSm className={
          prop?.spinnerColor
            ? prop.spinnerColor
            : (prop?.className?.includes('text-white') || !prop?.className?.includes('bg-white')
                ? "border-white w-4 h-4"
                : undefined)
        }/>
        </div>}
      </div>
    </button>
  );
};

export default Button;
