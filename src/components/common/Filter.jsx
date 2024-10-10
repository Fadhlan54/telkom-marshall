"use client";

import { useEffect, useRef, useState } from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiFilter2Fill,
} from "react-icons/ri";

export default function Filter({ children }) {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const filterRef = useRef();
  const buttonFilterRef = useRef();
  const toggleFilter = (e) => {
    e.preventDefault();
    setIsFilterVisible(!isFilterVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        buttonFilterRef.current &&
        !buttonFilterRef.current.contains(event.target)
      ) {
        setIsFilterVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <div className="relative w-fit ml-2">
      <button
        className={`border border-neutral-400 px-2 rounded-md flex items-center h-full ${
          isFilterVisible ? "outline outline-3 outline-blue-500" : ""
        }`}
        onClick={(e) => toggleFilter(e)}
        ref={buttonFilterRef}
      >
        <RiFilter2Fill className="w-4 h-4" />
        <p className="font-medium ml-1 mr-2 ">Filter</p>
        {isFilterVisible ? (
          <RiArrowUpSLine className="w-4 h-4" />
        ) : (
          <RiArrowDownSLine className="w-4 h-4" />
        )}
      </button>
      {isFilterVisible && (
        <div
          className="border border-neutral-400 px-3 py-3 rounded-md bg-white shadow-bottom-xl absolute -bottom-1.5 translate-y-full right-0 md:right-1/2 md:translate-x-1/2  w-fit z-10"
          ref={filterRef}
        >
          {children}
        </div>
      )}
    </div>
  );
}
