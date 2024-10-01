import { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export default function AuthInput({
  iId,
  iPlaceholder = "Enter input",
  iType = "text",
  iLabel,
  iState,
  iSetState,
  iIcon,
  cClass = "",
  errorMessage = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <div className={`relative ${cClass}`}>
      <div className="flex relative">
        <span
          className={`inline-flex items-center ps-3.5 bg-transparent border border-e-0  rounded-s-full ${
            errorMessage
              ? "text-alert-danger border-alert-danger"
              : "text-gray-900 border-gray-300"
          }`}
        >
          {iIcon}
        </span>
        <label
          htmlFor={iId}
          className={`block text-sm absolute top-0 left-9 -translate-y-1/2 px-1 font-semibold bg-[#E8E8E8] ${
            errorMessage ? "text-alert-danger" : "text-[#757575]"
          }`}
        >
          {iLabel}
        </label>
        <input
          type={
            iType === "password" ? (showPassword ? "text" : "password") : iType
          }
          id={iId}
          className={`rounded-e-full border-s-0 bg-transparent border  text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 py-3.5 outline-none focus:outline-none ${
            errorMessage ? " border-alert-danger" : " border-gray-300"
          }`}
          placeholder={iPlaceholder}
          value={iState}
          onChange={(e) => iSetState(e.target.value)}
          autoComplete="off"
        />
        {iType === "password" && (
          <div className="absolute right-0 pe-4 top-1/2 -translate-y-1/2  h-full flex items-center">
            <button
              className=" text-[#606060] hover:text-[#2b2b2b]"
              onClick={(e) => toggleShowPassword(e)}
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
