"use client";

import { useRef } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import TextInput from "./TextInput";

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
        <TextInput
          id={id}
          value={value}
          handleChange={(e) => handleSelectChange(e)}
          placeholder={placeholder}
          label={label}
          ref={selectRef}
        />
        <div>
          <ul>
            {options.map((option) => (
              <li
                key={option.value}
                className="hover:bg-slate-300 cursor-pointer"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    selectRef.current.value = option.value;
                    handleSelectChange(selectRef.current);
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
