"use client";

import { useState } from "react";
import {
  RiHistoryFill,
  RiFileAddLine,
  RiArrowDownSLine,
  RiHomeLine,
  RiArrowUpSLine,
  RiArrowDropRightLine,
  RiSettings3Line,
  RiBook3Line,
} from "react-icons/ri";

import { useSelector } from "react-redux";
import { selectIsFullSideNavVisible } from "@/lib/slices/navbarSlice";
import Link from "next/link";
import { BsDot } from "react-icons/bs";

export default function FullSideNavigation() {
  const isFullSideNavVisible = useSelector(selectIsFullSideNavVisible);
  const [isCreateMenuVisible, setIsCreateMenuVisible] = useState(false);
  const [isManipulateMenuVisible, setIsManipulateMenuVisible] = useState(false);

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

  return (
    <>
      {isFullSideNavVisible && (
        <div className="hidden lg:block w-64 min-h-screen h-[100%] border-r border-neutral-400 px-4 py-4 bg-white">
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
                      href="/review"
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

            <li className="px-2 py-1.5 rounded flex gap-2 items-center hover:bg-neutral-200">
              <RiHistoryFill className="w-4 h-4" /> View Request History
            </li>
            <li className="px-2 py-1.5 rounded flex gap-2 items-center hover:bg-neutral-200">
              <RiSettings3Line className="w-4 h-4" />
              Need Help?
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
