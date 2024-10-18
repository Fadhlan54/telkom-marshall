"use client";

import { setHasChanged } from "@/lib/slices/hasChangedSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const buttonSize = {
  sm: "gap-1 text-xs px-2 py-1 rounded-md",
  md: "gap-2 text-sm px-3 py-1.5  rounded-md",
  lg: "gap-2 text-base px-4 py-2 rounded-md",
};

const buttonVariant = {
  primary: "bg-primary-1 hover:bg-primary-2 focus:bg-primary-3 text-white",
  secondary:
    "bg-secondary-1 hover:bg-secondary-2 focus:bg-secondary-3 text-white",
  danger:
    "bg-alert-danger hover:bg-alert-danger-2 focus:bg-alert-danger-3 text-white",
  warning:
    "bg-alert-warning hover:bg-alert-warning-2 focus:bg-alert-warning-3 text-white",
  soft: "bg-soft hover:bg-soft-2 focus:bg-soft-3 text-primary-1",
  transparent:
    "bg-transparent text-primary-1 hover:text-primary-2 focus:text-primary-3",
};

export default function Button({
  children,
  size = "md",
  onClick,
  variant = "primary",
  full = false,
  href,
  className,
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    if (href) {
      dispatch(setHasChanged(false));
      router.push(href);
    } else {
      onClick(e);
    }
  };
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 ${
        variant === "transparent" ? "text-sm" : buttonSize[size]
      } ${buttonVariant[variant]} ${full && "w-full"} ${className}`}
    >
      {children}
    </button>
  );
}
