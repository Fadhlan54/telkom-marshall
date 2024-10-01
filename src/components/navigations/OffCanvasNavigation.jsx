"use client";

import { useState, useEffect, useRef } from "react";
import {
  RiHistoryFill,
  RiFileAddLine,
  RiArrowDownSLine,
  RiHomeLine,
  RiArrowUpSLine,
  RiArrowDropRightLine,
  RiSettings3Line,
  RiBook3Line,
  RiCustomerService2Line,
} from "react-icons/ri";
import {
  selectIsOffCanvasSideNavVisible,
  toggleOffCanvasSideNav,
} from "@/lib/slices/navbarSlice";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { BsDot } from "react-icons/bs";

export default function OffCanvasNavigation() {
  const isOffCanvasVisible = useSelector(selectIsOffCanvasSideNavVisible);
  const dispatch = useDispatch();
  const [isCreateMenuVisible, setIsCreateMenuVisible] = useState(false);
  const [isManipulateMenuVisible, setIsManipulateMenuVisible] = useState(false);

  const sideNavRef = useRef(null);

  const toggleMenu = (e, type) => {
    e.preventDefault();
    if (type === "create") {
      setIsCreateMenuVisible(!isCreateMenuVisible);
      setIsManipulateMenuVisible(false);
    } else if (type === "manipulate") {
      setIsManipulateMenuVisible(!isManipulateMenuVisible);
      setIsCreateMenuVisible(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
        dispatch(toggleOffCanvasSideNav());
      }
    };

    if (isOffCanvasVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOffCanvasVisible, dispatch]);

  return (
    <>
      {isOffCanvasVisible && (
        <div className="fixed top-[4rem] left-0 z-30 lg:hidden w-full h-full bg-black bg-opacity-30 lg:bg-transparent max-h-screen overflow-y-hidden">
          <div
            ref={sideNavRef} // Attach ref to the side nav
            className="w-64 min-h-screen h-[100%] border-r border-neutral-400 px-4 py-4 bg-white"
          >
            <div className="px-2">
              <h4 className="font-semibold">Menu</h4>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="px-2 py-1.5 rounded flex gap-2 items-center hover:bg-neutral-200"
                >
                  <RiHomeLine className="w-4 h-4" /> Home
                </Link>
              </li>
              <li>
                <button
                  onClick={(e) => toggleMenu(e, "create")}
                  className="px-2 py-1.5 rounded flex justify-between items-center hover:bg-neutral-200 w-full mb-1.5"
                >
                  <span className="flex items-center gap-2">
                    <RiFileAddLine className="w-4 h-4" /> Create
                  </span>

                  {isCreateMenuVisible ? (
                    <RiArrowUpSLine className="w-5 h-5" />
                  ) : (
                    <RiArrowDownSLine className="w-5 h-5" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out  space-y-2 ps-1.5 ${
                    isCreateMenuVisible ? "h-fit" : "max-h-0 hidden"
                  }`}
                >
                  <ul>
                    <li>
                      <Link
                        href="/review-module"
                        className="px-2 py-1.5 rounded flex items-center hover:bg-neutral-200"
                      >
                        <BsDot className="w-5 h-5 mr-1" />
                        Review Module
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/module"
                        className="px-2 py-1.5 rounded flex items-center hover:bg-neutral-200"
                      >
                        <BsDot className="w-5 h-5 mr-1" />
                        Generate Module
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/e-book"
                        className="px-2 py-1.5 rounded flex items-center hover:bg-neutral-200"
                      >
                        <BsDot className="w-5 h-5 mr-1" />
                        Update Ebook
                      </Link>
                    </li>
                    <li className="px-2 py-1.5 rounded flex items-center hover:bg-neutral-200">
                      <BsDot className="w-5 h-5 mr-1" /> CoQa
                    </li>
                    <li className="px-2 py-1.5 rounded flex items-center hover:bg-neutral-200">
                      <BsDot className="w-5 h-5 mr-1" /> Mapping Dirkom
                    </li>
                    <li className="px-2 py-1.5 rounded flex items-center hover:bg-neutral-200">
                      <BsDot className="w-5 h-5 mr-1" /> Audio Learning
                    </li>
                    <li className="px-2 py-1.5 rounded flex items-center hover:bg-neutral-200">
                      <BsDot className="w-5 h-5 mr-1" /> Video Learning
                    </li>
                  </ul>
                </div>
              </li>

              <li className="px-2 py-1.5 rounded flex gap-2 items-center hover:bg-neutral-200">
                <RiBook3Line className="w-4 h-4" />
                E-library
              </li>

              <li>
                <Link
                  href={"/request-history"}
                  className="px-2 py-1.5 rounded flex gap-2 items-center hover:bg-neutral-200"
                >
                  <RiHistoryFill className="w-4 h-4" /> View Request History
                </Link>
              </li>
              <li className="px-2 py-1.5 rounded flex gap-2 items-center hover:bg-neutral-200">
                <RiCustomerService2Line className="w-4 h-4" />
                Need Help?
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
