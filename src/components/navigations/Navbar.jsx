"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine, RiMenuLine } from "react-icons/ri";

import {
  toggleFullSideNav,
  toggleOffCanvasSideNav,
} from "@/lib/slices/navbarSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { selectHasChanged } from "@/lib/slices/hasChangedSlice";
import useBeforeUnload from "@/hooks/useBeforeUnload";

export default function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dispatch = useDispatch();
  const hasChanged = useSelector(selectHasChanged);

  const profileRef = useRef(null);

  const toggleProfileMenu = (e) => {
    e.preventDefault();
    setShowProfileMenu(!showProfileMenu);
  };

  const handleFullSideNav = (e) => {
    e.preventDefault();
    dispatch(toggleFullSideNav());
  };

  const handleOffCanvasSideNav = (e) => {
    e.preventDefault();
    dispatch(toggleOffCanvasSideNav());
  };

  const handleClickOutsideProfile = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfileMenu(false);
    }
  };

  useBeforeUnload(hasChanged);

  useEffect(() => {
    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutsideProfile);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideProfile);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideProfile);
    };
  }, [showProfileMenu]);
  return (
    <>
      <div className="w-full h-16"></div>
      <nav className="bg-white fixed top-0 z-40  w-full border-b border-neutral-400 flex justify-between px-4 md:px-6 items-center h-16">
        <div className="flex gap-3 md:gap-4 items-center">
          <button className="lg:hidden">
            <RiMenuLine
              className="w-5 h-5"
              onClick={(e) => handleOffCanvasSideNav(e)}
            />
          </button>
          <button className="hidden lg:block">
            <RiMenuLine
              className="w-5 h-5"
              onClick={(e) => handleFullSideNav(e)}
            />
          </button>

          <Image
            src="/images/ITDRI_logo.png"
            width={100}
            height={56.3}
            alt="Indonesia Telecommunication & Digital Research Institute (ITDRI) Logo"
            className="hidden md:block w-auto h-auto"
            priority
          />
          <Image
            src={"/images/logo.png"}
            width={200}
            height={73}
            alt="Marshall Logo"
            className="w-[120px] h-auto"
          />
        </div>
        <div className="relative flex gap-2 items-center">
          <div className="rounded-full bg-[#E8E8E8] w-8 h-8"></div>
          <p className="text-[#757575] mr-1">Admin</p>
          <button onClick={(e) => toggleProfileMenu(e)}>
            {showProfileMenu ? (
              <RiArrowUpSLine className="w-5 h-5" />
            ) : (
              <RiArrowDownSLine className="w-5 h-5" />
            )}
          </button>

          {showProfileMenu && (
            <div
              className="border absolute top-10 right-0 p-4 bg-white rounded-lg shadow-md"
              ref={profileRef}
            >
              <p>admin@telkom.com</p>
              <p>administrator</p>
              <p>Profile</p>
              <Link href="/login" className="block">
                Login
              </Link>
              <Link href="/login">Logout</Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
