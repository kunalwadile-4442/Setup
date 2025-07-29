import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { App_url } from "../utils/constants/static";
import { LuEye, LuSearch, LuEyeOff } from "react-icons/lu";


type InputFieldTypes = {
  label?: any;
  value?: any;
  type?: string;
  name?: string | React.ReactNode;
  innerRender?: React.ReactNode;
  placeholder?: string;
  inputClassName?: string;
  controlClassName?: string;
  className?: string;
  labelClassName?: string
  useFor?: "textarea" | "search" | "editor"|'';
  tagPage?: "Purchase Order Email" | "Sale Order Email" | "Invoice Email" | "Inquiry Email" | any;
  textEditorOption?: { isToolbar: boolean }
  control?: any;
  control_name?: string;
  register?: any;
  error?: any;
  id?: any;
  key?: any;
  rows?: number;
  required?: boolean;
  onEnterClick?: Function;
  onKeyDown?: Function;
  onBlur?: Function;
  onFocus?: Function;
  onClickRightLabel?: Function;
  onChange?: Function;
  disabled?: boolean;
  readOnly?: boolean;
  leftLabel?: any;
  rightLabel?: any;
  rules?: any;
  autocomplete?: string;
  chatInputClassName?: string;
};


const InputField = (prop: InputFieldTypes) => {
  // const [Focus, setFocus] = useState(false);
  const {type='text'}=prop
  const [readOnly, setReadonly] = useState(true);
  const [Password, setPassword] = useState(false);


  const callOnFocus = (e:any) => {
    e.preventDefault();
    if (!prop?.readOnly) {
      setReadonly(false);
    };
    if (prop?.onFocus) {
      prop?.onFocus(e);
    }
  };
  const callOnBlur = (e:any) => {
    if (!prop?.readOnly) {
      setReadonly(true);
    }
    if (prop?.onBlur) {
      prop?.onBlur(e);
    }
  };
  const onClickRightLabel = () => {
    if (prop?.onClickRightLabel) {
      prop?.onClickRightLabel()
    }
  }
const renderInput = (field:any) => {
  const onChange = (e:any) => {
    if (prop?.control) {
      field.onChange(e.target.value);
    } else if (field?.onChange) {
      field.onChange(e);
    }
    if (prop?.onChange) {
      prop?.onChange({
        name: e.target.name || prop?.name || field?.name,
        value: e.target.value,
      });
    }
  };



  return (
    <div
      className={`flex border-[1px] items-center justify-center overflow-hidden ${prop.inputClassName}
        ${prop.error ? "border-red-600" : `focus-within:border-primary border-[#C8C9C9]`}
        ${prop?.rightLabel && "right_icon"}  ${prop.disabled && "input-disabled"}`}
      onClick={callOnFocus}
      onTouchStart={callOnFocus}
    >
      {prop.useFor === "search" && (
          <span className="w-[40px] h-[30px] flex items-center justify-center pl-[7px] pr-[7px]">
            <LuSearch className="h-full text-[#77808D] transform text-[20px]" />
          </span>
        )}
      <input
        onKeyDown={prop.onEnterClick && prop.onEnterClick}
        placeholder={
          prop.placeholder
            ? prop.placeholder
            : typeof prop.name === "string"
              ? `Enter ${prop.name.charAt(0).toLowerCase() + prop.name.slice(1)}`
              : ""
        }
        autoComplete={prop?.autocomplete}
        type={prop.type === "password" ? !Password ? "password" : "text":type} // Toggle type here
        id={prop.id}
        className={`focus:outline-none w-full px-3 py-2 placeholder:text-sm text-sm h-full ${prop.useFor === "search" ? "max-w-[calc(100%-30px)] pl-0" : ""} ${prop.useFor === "search" ? prop.controlClassName : prop.inputClassName}`}
        {...field}
        onChange={onChange}
        onFocus={callOnFocus}
        onBlur={callOnBlur}
        readOnly={prop?.readOnly || readOnly}
        disabled={prop.disabled}
        value={field?.value || prop?.value}
      />
      

      {prop?.rightLabel && (
        <span className="right-label cursor-pointer" onClick={onClickRightLabel}>
          {prop?.rightLabel}
        </span>
      )}
      {prop.type === "password" &&
          (Password ? (
            <LuEyeOff
              className="cursor-pointer ml-2  h-full mr-3"
              onClick={() => setPassword(!Password)}
            />
          ) : (
            <LuEye
              className="cursor-pointer ml-2 h-full mr-3"
              onClick={() => setPassword(!Password)}
            />
          ))}
    </div>
  );
};


  const renderTextarea = (field:any) => {
    const onChange = (e:any) => {
      if (prop?.control) {
        field.onChange(e.target.value);
      } else if (field?.onChange) {
        field.onChange(e);
      }
      if (prop?.onChange) {
        prop?.onChange({
          name: e.target.name || prop?.name,
          value: e.target.value,
        });
      }
    }
    return (
      <div
        className={`bg-white border-[1px] w-full ${prop.inputClassName
          } ${prop.error
            ? "border-red-600"
            : `focus-within:border-primary border-[#C8C9C9]`
          } overflow-hidden d-flex flex-col ${prop.disabled && "input-disabled"} `}
      >
        <div className={`flex ${prop?.innerRender ? "h-[calc(100%-45px)] overflow-auto" : "h-full"} ${prop?.rightLabel && "right_icon "}`}>
          <textarea
            {...field}
            placeholder={prop.placeholder}
            className={`rounded focus:outline-none w-full text-sm placeholder:text-sm px-2 py-2 ${prop.chatInputClassName}`}
            onFocus={callOnFocus}
            // onChange={prop?.onChange}
            onChange={onChange}
            onKeyDown={prop?.onKeyDown && prop?.onKeyDown}
            // readOnly={readOnly}
            rows={prop?.rows}
            value={field?.value || prop?.value}
            disabled={prop.disabled}
          />
          {prop?.rightLabel && (
            <span className="right-label ms-auto cursor-pointer" onClick={onClickRightLabel}>
              {prop?.rightLabel}
            </span>
          )}
        </div>
        {prop?.innerRender}
      </div>
    );
  }

  const ErrorInfo = ({ error }:any) => {
    const imageLoad = () =>{
      return(
        <img className="h-[0.5rem]" src={App_url.image.info} alt="" />
      )
    }
    if (!error) {
      return (
        <React.Fragment></React.Fragment>
      )
    }
    return (
      <div className="min-h-4 py-[0.15rem]">
        <div className="flex items-center">
          {imageLoad()}
          <p className="text-xs mx-1 text-red-600 text-left">
            {error?.message || error}
          </p>
        </div>
      </div>
    )
  }
  const renderInputGroup = (field:any) => {
    if(prop.useFor === "textarea"){
      return renderTextarea(field);
    }
    return renderInput(field);
  }

  return (
    <div className={`input-form-group ${prop.className}`}>
      {(prop.name || prop?.label) && (
        <p className={`text-[#4E4E4E] text-sm ${prop.labelClassName} whitespace-nowrap`}>
          {prop?.label || prop.name}
          {prop.required && <span className="text-red-600"> *</span>}
        </p>
      )}
        {prop.control && prop.control_name ? (
          <Controller
            name={prop.control_name}
            control={prop.control}
            rules={prop?.rules}
            render={({ field }) => (
              <>
                {renderInputGroup(field)}
                {ErrorInfo({error:prop.error})}
              </>
            )}
          />
        ) : (
          <>
            {renderInputGroup(prop.register)}
            {ErrorInfo({error:prop.error})}
          </>
        )}
    </div>
  );
};

export default InputField;