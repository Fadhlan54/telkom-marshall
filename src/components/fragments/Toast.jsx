"use client";

import {
  RiCheckboxCircleFill,
  RiCloseFill,
  RiErrorWarningFill,
} from "react-icons/ri";
import { selectToast } from "@/lib/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";
import { closeToast } from "@/lib/slices/toastSlice";

export default function Toast() {
  const dispatch = useDispatch();
  const toast = useSelector(selectToast);
  const hideToast = (e) => {
    e.preventDefault();
    dispatch(closeToast());
  };

  return (
    <div>
      {/* {toast.isOpen && ( */}
      <div
        className={`fixed mx-2 ${
          toast.isOpen ? "top-2" : "translate-x-[200%]"
        } right-0  transform border flex gap-2 transition-transform duration-500 ease-in-out  max-w-[30rem] 
           rounded-lg px-3 py-2 text-sm z-50 items-center bg-white shadow-lg ${
             toast.type === "success"
               ? "border-alert-success"
               : toast.type === "danger" && "border-alert-danger"
           }`}
      >
        {toast.type === "success" ? (
          <RiCheckboxCircleFill className="w-8 h-8 text-alert-success" />
        ) : (
          <RiErrorWarningFill className="w-8 h-8 text-alert-danger" />
        )}
        <div>
          <h2 className="font-semibold">
            {toast.type === "success" ? "Success" : "Failed"}
          </h2>
          <p>{toast.message}</p>
        </div>
        <button onClick={(e) => hideToast(e)} className="ml-auto">
          <RiCloseFill className="w-6 h-6 text-neutral-400" />
        </button>
      </div>
      {/* )} */}
    </div>
  );
}
