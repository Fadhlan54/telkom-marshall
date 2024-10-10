"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  RiBookLine,
  RiHistoryFill,
  RiHomeLine,
  RiSettings3Line,
} from "react-icons/ri";
import CustomLink from "../common/CustomLink";

export default function BottomNavigation() {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos || currentScrollPos < 10) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <>
      <div className="h-[4.5rem] w-full sm:hidden"></div>
      <div
        className={`fixed bottom-0 left-0  h-[4.5rem] flex w-full justify-evenly bg-white pt-2 text-2xl border-t shadow-top-md text-neutral-600 transition-transform 
duration-300 sm:hidden ${visible ? "translate-y-0" : "translate-y-full"}  `}
      >
        <CustomLink
          href={"/"}
          className={`rounded-t-2xl px-4 py-1 flex flex-col items-center ${
            pathname === "/" && "bg-neutral-300 text-white"
          }`}
        >
          <RiHomeLine />
          <p className="text-xs mt-0.5">Home</p>
        </CustomLink>
        <CustomLink
          href={"/request-history"}
          className={`rounded-t-2xl px-3 py-1 flex flex-col items-center ${
            pathname === "/request-history" && "bg-neutral-300 text-white"
          }`}
        >
          <RiHistoryFill className="icon" />
          <p className="text-xs mt-0.5 text-center">
            Request <br /> History
          </p>
        </CustomLink>
        <CustomLink
          href={"/e-library"}
          className="rounded-t-2xl px-4 py-1  flex flex-col items-center"
        >
          <RiBookLine />
          <p className="text-xs mt-0.5">E-library</p>
        </CustomLink>
        <CustomLink
          href={"/"}
          className="rounded-t-2xl px-4 py-1  flex flex-col items-center"
        >
          <RiSettings3Line />
          <p className="text-xs mt-0.5">Settings</p>
        </CustomLink>
      </div>
    </>
  );
}
