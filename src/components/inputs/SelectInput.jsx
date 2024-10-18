"use client";

import { useRef } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

export default function SelectInput({
  value,
  label,
  id,
  options = [],
  placeholder,
  required = false,
  setValue,
  handleChange,
  disabled = false,
}) {
  const selectRef = useRef(null);

  const handleSelectChange = (e) => {
    if (handleChange) {
      handleChange(e);
    } else if (setValue) {
      setValue(e.target.value);
    }
  };
  return (
    <div className="flex flex-col gap-1 text-sm">
      <label htmlFor={id} className="font-semibold">
        {label} {required && <span className="text-alert-danger">*</span>}
      </label>
      <div className="relative">
        <select
          name={id}
          id={id}
          className={`w-full border-2  border-neutral-400 p-2 rounded-lg focus:outline-primary-1 appearance-none ${
            !value && placeholder ? "text-neutral-400 " : "text-black"
          }`}
          ref={selectRef}
          onChange={(e) => {
            handleSelectChange(e);
          }}
          value={value}
          disabled={disabled}
        >
          {placeholder && (
            <option value="" className="text-gray-400" disabled hidden>
              {placeholder || "Select an option"}
            </option>
          )}

          {options.length === 0 && (
            <option value="" className="text-gray-400" disabled>
              No options available
            </option>
          )}

          {options.length > 0 &&
            options.map((item, index) => (
              <option key={index} value={item.value} className="text-black">
                {item.label}
              </option>
            ))}
        </select>

        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <RiArrowDownSLine className=" w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
