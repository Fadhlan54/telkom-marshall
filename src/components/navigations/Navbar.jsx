"use client";

import Image from "next/image";
import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine, RiMenuLine } from "react-icons/ri";

import { toggleSideNav } from "@/lib/slices/navbarSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

export default function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dispatch = useDispatch();

  const toggleProfileMenu = (e) => {
    e.preventDefault();
    setShowProfileMenu(!showProfileMenu);
  };

  const handleSideNav = (e) => {
    e.preventDefault();
    dispatch(toggleSideNav());
  };
  return (
    <>
      <div className="w-full h-16"></div>
      <nav className="bg-white fixed top-0 z-50  w-full border-b border-neutral-400 flex justify-between px-4 md:px-6 items-center h-16">
        <div className="flex gap-3 md:gap-4 items-center">
          <button>
            <RiMenuLine className="w-5 h-5" onClick={(e) => handleSideNav(e)} />
          </button>

          <Image
            src="/images/ITDRI_logo.png"
            width={100}
            height={56.3}
            alt="Indonesia Telecommunication & Digital Research Institute (ITDRI) Logo"
            className="hidden md:block"
          />
          <Image
            src={"/images/logo.png"}
            width={200}
            height={73}
            alt="Marshall Logo"
            className="w-[120px] h-[44px]"
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
            <div className="border absolute top-10 right-0 p-4 bg-white rounded-lg shadow-md">
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
