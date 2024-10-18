"use client";

import { showToastWithTimeout } from "@/lib/slices/toastSlice";
import Image from "next/image";
import { useRef, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch } from "react-redux";

export default function DragNDropInput({
  stateFile,
  setStateFile,
  label,
  type = "all",
  id,
  required = false,
}) {
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (type === "ppt") {
      if (
        file?.type !==
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) {
        setStateFile(null);
        dispatch(
          showToastWithTimeout({
            type: "danger",
            message: "Only PPT files are allowed",
            duration: 4000,
          })
        );
        return;
      }
      setStateFile(file);
    } else if (type === "pdf") {
      if (file?.type !== "application/pdf") {
        setStateFile(null);
        dispatch(
          showToastWithTimeout({
            type: "danger",
            message: "Only PDF files are allowed",
            duration: 4000,
          })
        );
        return;
      }
      setStateFile(file);
    } else if (type === "all") {
      setStateFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    const fileExt = file.name.split(".")[file.name.split(".").length - 1];
    if (type === "ppt" || type === "pptx") {
      if (fileExt !== "pptx" && fileExt !== "ppt") {
        setStateFile(null);
        dispatch(
          showToastWithTimeout({
            type: "danger",
            message: "Only PPT files are allowed",
            duration: 4000,
          })
        );
        return;
      }
      setStateFile(file);
    } else if (type === "pdf") {
      if (fileExt !== "pdf") {
        setStateFile(null);
        dispatch(
          showToastWithTimeout({
            type: "danger",
            message: "Only PDF files are allowed",
            duration: 4000,
          })
        );
        return;
      }
      setStateFile(file);
    } else if (type === "all") {
      setStateFile(file);
    }
  };
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block font-semibold hover:cursor-pointer text-sm"
      >
        {label} {required && <span className="text-alert-danger">*</span>}
      </label>
      <div
        className={`relative border-2 p-4 w-full flex flex-col items-center gap-2 text-center text-xs mt-2 text-neutral-600 ${
          !isDragging ? "border-grey-2" : "border-primary-1"
        } rounded-md cursor-pointer`}
        onDragOver={(e) => handleDragOver(e, "ebook")}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e)}
      >
        {stateFile && (
          <button
            className="absolute top-2 right-2"
            onClick={() => setStateFile(null)}
          >
            <RiCloseFill className="w-4 h-4 hover:text-alert-danger" />
          </button>
        )}
        <Image
          src={type === "ppt" ? "/images/ppt-icon.png" : "/images/pdf-icon.png"}
          width={40}
          height={40}
          alt="ppt-icon"
        />
        {stateFile ? (
          <p className="font-medium">{stateFile.name}</p>
        ) : (
          <p>
            Drag & Drop {type} file here <br /> or <br /> Click{" "}
            <button
              className="text-primary-1 hover:underline font-medium"
              onClick={(e) => handleClick(e, "ebook")}
            >
              here
            </button>{" "}
            to upload{" "}
          </p>
        )}
      </div>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        id={id}
        onChange={(e) => handleFileChange(e, "ebook")}
        accept={
          type === "ppt"
            ? ".ppt,.pptx"
            : type === "pdf"
            ? ".pdf"
            : type === "all" && "*"
        }
      />
    </div>
  );
}
