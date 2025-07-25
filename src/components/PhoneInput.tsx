import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { App_url } from '../utils/constants/static';
import { Controller } from 'react-hook-form';
import type { IPhoneInput } from '../utils/Types/types';



const PhoneInputComp: React.FC<IPhoneInput> = ({
  label,
  name,
  required,
  control,
 defaultValue = { phone: '', phone_code: '',dialCode:'1',countryCode: 'us' },
  rules,
  className,
  
}) => {

  

  const renderPhoneInput = ({ field, fieldState }:any) => {
    // console.log("country::",country)

    const onChangePhoneInput = (value:any, data:any, input_value:any) => {
      field.onChange({
        phone: value,
        phone_code: data?.dialCode,
        format: data?.format,
        input_value: input_value,
        countryCode: data?.countryCode,
        dialCode: data?.dialCode,
        countryName: data?.countryName,

      });
    }
    // Safeguard against undefined or null values
    const phoneValue = field?.value?.phone || null;
    // console.log("phoneValue::",phoneValue)
    // const phoneCode = field?.value?.phone_code || '';
    const format = field?.value?.format || '';
    // const phoneValue = field?.value?.phone || '';
    const dialCode = field?.value?.dialCode || '1';
    const countryCode = field?.value?.countryCode || 'us'
    const enableLongNumbers = (format.replace(/[\s()]/g, '').replace(/[+-]/g, '')?.length - parseFloat(field?.value?.phone_code?.length)) || false;

    return(
      <>
        <PhoneInput
          country={countryCode}
          placeholder="Enter contact number"
          enableSearch
           value={phoneValue || dialCode}
          // disableCountryCode
          // country={field?.value?.phone || null}
          onChange={onChangePhoneInput}
          containerClass={"phone-input-container-class "}
          inputClass={`phone-input-field-class rounded-md ${ fieldState.error ? 'border-red-600' : '' }`}
          buttonClass="phone-input-button-class"
          enableLongNumbers={enableLongNumbers}
          dropdownClass={"phone-input-dropdown-class"}
        />
          {fieldState.error && (
            <div className="min-h-4 py-[0.15rem]">
              <div className="flex items-center">
                <img className="h-[0.5rem]" src={App_url.image.info} alt="" />
                <p className="text-xs mx-1 text-red-600  text-left">{fieldState.error.message}</p>
              </div>
            </div>
          )}
      </>
    )
  }
  return (
    <div className={`phone-input-container ${className}`}>
        <p className={`text-[#4E4E4E] text-sm  whitespace-nowrap`}>
        {label}
        {required && <span className="text-red-600"> *</span>}
      </p>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={renderPhoneInput}
      />
    </div>
  );
};

export default PhoneInputComp;
