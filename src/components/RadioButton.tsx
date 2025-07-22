import React, { useMemo } from "react";
import { Controller } from "react-hook-form";
import { UUID4 } from "../utils/common/common";
import { App_url } from "../utils/constants/static";

type Option = {
  label: string;
  value: string;
};

type RadioButtonProps = {
  label?: string;
  value?: string;
  name?: string;
  isChecked?: boolean;
  disable?: boolean;
  error?: any;
  control?: any;
  controlName?: string;
  register?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  className?: string;
  rules?: any;
  options?: Option[]; 
};

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  // name,
  // isChecked,
  disable,
  error,
  control,
  controlName,
  register,
  // onChange,
  onClick,
  className,
  rules,
  options,
}) => {
  const uuid = useMemo(() => UUID4(), []);

  const renderSingleRadio = (
    field: any,
    optionValue: string,
    optionLabel: string
  ) => (
    <div
      key={optionValue}
      className={`flex items-center gap-2 ${className} ${
        error
          ? "text-red-600"
          : field.value === optionValue
          ? "text-primary"
          : ""
      } ${disable ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input
        type="radio"
        {...field}
        value={optionValue}
        checked={field.value === optionValue}
        onClick={onClick}
        className="cursor-pointer h-[18px] w-[18px] accent-blue-500"
        disabled={disable}
        id={`${uuid}_${optionValue}`}
      />
      <label htmlFor={`${uuid}_${optionValue}`} className="text-sm">
        {optionLabel}
      </label>
    </div>
  );

  const ErrorInfo = ({ error }:any) => {
    if (!error) return null;
    return (
      <div className="min-h-4 py-[0.15rem]">
        <div className="flex items-center">
          <img className="h-[0.5rem]" src={App_url.image.info} alt="" />
          <p className="text-xs mx-1 text-red-600  text-left">
            {error?.message || error}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      {control && controlName ? (
        <Controller
          name={controlName}
          control={control}
          rules={rules}
          render={({ field, fieldState }) => (
            <>
              {options ? (
                <div className="flex gap-4">
                  {options.map((opt) =>
                    renderSingleRadio(field, opt.value, opt.label)
                  )}
                </div>
              ) : (
                renderSingleRadio(field, value ?? "", label ?? "")
              )}
              <ErrorInfo error={fieldState?.error} />
            </>
          )}
        />
      ) : (
        <>
          {renderSingleRadio(register, value ?? '', label ?? '')}
          <ErrorInfo error={error} />
        </>
      )}
    </div>
  );
};

export default RadioButton;
