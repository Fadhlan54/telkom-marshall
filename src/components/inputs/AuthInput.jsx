import { useRef, useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export default function AuthInput({
  id,
  placeholder = "Enter input",
  type = "text",
  label,
  value,
  setValue,
  icon,
  className = "",
  errorMessage = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <div className={`relative ${className}`}>
      <div className="flex relative">
        <label
          htmlFor={id}
          className={`inline-flex items-center ps-3.5 bg-transparent border border-e-0  rounded-s-full ${
            errorMessage
              ? "text-alert-danger border-alert-danger"
              : "text-gray-900 border-gray-300"
          }`}
        >
          {icon}
        </label>
        <label
          htmlFor={id}
          className={`block text-sm absolute top-0 left-9 -translate-y-1/2 px-1 font-semibold bg-[#E8E8E8] ${
            errorMessage ? "text-alert-danger" : "text-[#757575]"
          }`}
        >
          {label}
        </label>
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          id={id}
          className={`rounded-e-full border-s-0 bg-transparent border  text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 py-3.5 outline-none   ${
            errorMessage ? " border-alert-danger" : " border-gray-300"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          onFocus={handleFocus}
        />
        {type === "password" && (
          <div className="absolute right-0 pe-4 top-1/2 -translate-y-1/2  h-full flex items-center">
            <button
              className=" text-[#606060] hover:text-[#2b2b2b]"
              type="button"
              onClick={(e) => toggleShowPassword(e)}
              onKeyDown={(e) => {
                if (e.key === "Enter") return;
              }}
            >
              {showPassword ? (
                <RiEyeOffLine className="w-4 h-4" />
              ) : (
                <RiEyeLine className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>
      {errorMessage && errorMessage !== "null" && (
        <p className="text-xs text-alert-danger mt-1 ps-1">{errorMessage}</p>
      )}
    </div>
  );
}
