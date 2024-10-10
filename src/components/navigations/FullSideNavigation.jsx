"use client";

import { useState } from "react";
import {
  RiHistoryFill,
  RiFileAddLine,
  RiArrowDownSLine,
  RiHomeLine,
  RiArrowUpSLine,
  RiBook3Line,
  RiCustomerService2Line,
} from "react-icons/ri";

import { useSelector } from "react-redux";
import { selectIsFullSideNavVisible } from "@/lib/slices/navbarSlice";
import CustomLink from "../common/CustomLink";
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
              <CustomLink
                href="/"
                className="px-2 py-1.5 rounded flex flex-shrink-0  gap-2 items-center hover:bg-neutral-200 w-full"
              >
                <RiHomeLine className="w-4 h-4" /> Home
              </CustomLink>
            </li>
            <li>
              <button
                onClick={(e) => toggleMenu(e, "create")}
                className="px-2 py-1.5 rounded flex flex-shrink-0 justify-between items-center hover:bg-neutral-200 w-full mb-1.5"
              >
                <span className="flex flex-shrink-0 items-center gap-2">
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
                    <CustomLink
                      href="/review-module"
                      className="px-2 py-1.5 rounded flex flex-shrink-0 items-center hover:bg-neutral-200 w-full"
                    >
                      <BsDot className="w-5 h-5 mr-1" />
                      Review Module
                    </CustomLink>
                  </li>
                  <li>
                    <CustomLink
                      href="/module"
                      className="px-2 py-1.5 rounded flex flex-shrink-0 items-center hover:bg-neutral-200 w-full"
                    >
                      <BsDot className="w-5 h-5 mr-1" />
                      Generate Module
                    </CustomLink>
                  </li>
                  <li>
                    <CustomLink
                      href="/e-book"
                      className="px-2 py-1.5 rounded flex flex-shrink-0 items-center hover:bg-neutral-200 w-full"
                    >
                      <BsDot className="w-5 h-5 mr-1" />
                      Update Ebook
                    </CustomLink>
                  </li>
                  <li className="px-2 py-1.5 rounded flex flex-shrink-0 items-center hover:bg-neutral-200">
                    <BsDot className="w-5 h-5 mr-1" /> CoQa
                  </li>
                  <li className="px-2 py-1.5 rounded flex flex-shrink-0 items-center hover:bg-neutral-200">
                    <BsDot className="w-5 h-5 mr-1" /> Mapping Dirkom
                  </li>
                  <li className="px-2 py-1.5 rounded flex flex-shrink-0 items-center hover:bg-neutral-200">
                    <BsDot className="w-5 h-5 mr-1" /> Audio Learning
                  </li>
                  <li className="px-2 py-1.5 rounded flex flex-shrink-0 items-center hover:bg-neutral-200">
                    <BsDot className="w-5 h-5 mr-1" /> Video Learning
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <CustomLink
                href={"/e-library"}
                className="px-2 py-1.5 rounded flex flex-shrink-0 gap-2 items-center hover:bg-neutral-200 w-full"
              >
                <RiBook3Line className="w-4 h-4" />
                E-library
              </CustomLink>
            </li>

            <li>
              <CustomLink
                href="/request-history"
                className="px-2 py-1.5 rounded flex flex-shrink-0 gap-2 items-center hover:bg-neutral-200 w-full"
              >
                <RiHistoryFill className="w-4 h-4" /> View Request History
              </CustomLink>
            </li>
            <li className="px-2 py-1.5 rounded flex flex-shrink-0 gap-2 items-center hover:bg-neutral-200 w-full">
              <RiCustomerService2Line className="w-4 h-4" />
              Need Help?
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
