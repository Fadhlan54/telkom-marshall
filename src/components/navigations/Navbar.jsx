"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RiLogoutBoxRLine, RiMenuLine } from "react-icons/ri";

import {
  toggleFullSideNav,
  toggleOffCanvasSideNav,
} from "@/lib/slices/navbarSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectHasChanged } from "@/lib/slices/hasChangedSlice";
import useBeforeUnload from "@/hooks/useBeforeUnload";
import { getCookies } from "@/utils/cookies";
import { logoutService } from "@/service/authentication";
import CustomLink from "../common/CustomLink";

export default function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dispatch = useDispatch();
  const hasChanged = useSelector(selectHasChanged);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const getUsername = async () => {
      const usernameCookie = await getCookies("username");
      setUsername(usernameCookie || "Widih Hengker");
    };

    getUsername();
  }, []);

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

  const handleLogout = async () => {
    const token = await getCookies("access_token");

    if (token) {
      try {
        const response = await logoutService(token);
      } catch (e) {
        console.log(e);
      }
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
      <nav className="bg-white fixed top-0 z-40  w-full border-b border-primary-1 flex justify-between px-4 md:px-6 items-center h-16">
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
            className="hidden md:block w-[100px] h-auto"
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
          <div className="flex flex-col justify-center items-end mr-1">
            <h4 className="leading-4 font-medium text-sm">{username}</h4>
            <CustomLink href={"/profile"} className="text-xs text-grey-4">
              profile
            </CustomLink>
          </div>
          <div className="rounded-full bg-[#E8E8E8] w-8 h-8"></div>

          <button onClick={handleLogout}>
            <RiLogoutBoxRLine className="w-5 h-5 text-alert-danger hover:text-alert-danger-2 focus:text-alert-danger-3" />
          </button>

          {showProfileMenu && (
            <div
              className="border absolute top-10 right-0 p-4 bg-white rounded-lg shadow-md"
              ref={profileRef}
            >
              <p>admin@telkom.com</p>
              <p>administrator</p>
              <p>Profile</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
