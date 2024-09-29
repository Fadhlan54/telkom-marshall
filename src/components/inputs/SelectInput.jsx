"use client";

import { useEffect, useRef } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

export default function SelectInput({
  setStateValue,
  label,
  id,
  options = [],
  placeholder,
  required = false,
  handleChange,
  disabled = false,
}) {
  const selectRef = useRef(null);

  useEffect(() => {
    if (!setStateValue) {
      throw new Error(
        "The 'setStateValue' prop is required in SelectInput component."
      );
    }
    if (!id) {
      throw new Error("The 'id' prop is required in SelectInput component.");
    }
    if (!label) {
      throw new Error("The 'label' prop is required in SelectInput component.");
    }
    if (options) {
      if (!Array.isArray(options)) {
        throw new Error(
          "The 'options' prop must be an array in SelectInput component."
        );
      }
      options.forEach((option) => {
        if (!option.label || !option.value) {
          throw new Error(
            "The 'options' prop must be an array of objects with 'label' and 'value' properties in SelectInput component."
          );
        }
      });
    }
  }, [setStateValue, id, label, options]);
  return (
    <div className="flex flex-col gap-1 text-sm">
      <label htmlFor={id} className="font-semibold">
        {label} {required && <span className="text-alert-danger">*</span>}
      </label>
      <div className="relative">
        <select
          name={id}
          id={id}
          className="w-full border-2  border-neutral-400 p-2 rounded-lg appearance-none"
          ref={selectRef}
          onChange={(e) => {
            if (handleChange) {
              handleChange(e);
            } else {
              setStateValue(e.target.value);
            }
          }}
          disabled={disabled}
        >
          {placeholder && (
            <option value="" className="text-gray-400" disabled hidden selected>
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
              <option key={index} value={item.value}>
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
