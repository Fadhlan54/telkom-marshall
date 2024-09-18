import { RiExpandRightLine, RiSettings3Line } from "react-icons/ri";

import {
  RiHistoryFill,
  RiBookLine,
  RiFileAddLine,
  RiHomeLine,
  RiFileEditLine,
} from "react-icons/ri";

import { toggleSideNavType } from "@/lib/slices/navbarSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

export default function MiniSIdeNavigation() {
  const dispatch = useDispatch();

  const toggleMenu = (e) => {
    e.preventDefault();
    dispatch(toggleSideNavType());
  };
  return (
    <div className="hidden sm:block border-r border-neutral-400 p-2 min-h-screen h-[100%] text-neutral-600 text-[0.6rem] text-center">
      <button className="p-2 mb-2 mx-auto block" onClick={(e) => toggleMenu(e)}>
        <RiExpandRightLine className="w-6 h-6" />
      </button>
      <ul>
        <li className="mb-1 p-1 flex flex-col items-center hover:bg-neutral-200 rounded-lg">
          <Link href="/">
            <RiHomeLine className="w-6 h-6 mb-0.5" />
            <p>Home</p>
          </Link>
        </li>
        <li className="mb-1 p-1 flex flex-col items-center hover:bg-neutral-200 rounded-lg">
          <RiFileAddLine className="w-6 h-6 mb-0.5" />
          <p>Create</p>
        </li>
        <li className="mb-1 p-1 flex flex-col items-center hover:bg-neutral-200 rounded-lg">
          <RiFileEditLine className="w-6 h-6 mb-0.5" />
          <p>
            Manipulate
            <br />
            Module
          </p>
        </li>
        <li className="mb-1 p-1 flex flex-col items-center hover:bg-neutral-200 rounded-lg">
          <RiBookLine className="w-6 h-6 mb-0.5" />
          <p>E-library</p>
        </li>
        <li className="mb-1 p-1 flex flex-col items-center hover:bg-neutral-200 rounded-lg">
          <RiHistoryFill className="w-6 h-6 mb-0.5" />
          <p>
            Request <br />
            History
          </p>
        </li>
        <li className="mb-1 p-1 flex flex-col items-center hover:bg-neutral-200 rounded-lg">
          <RiSettings3Line className="w-6 h-6 mb-0.5" />
          <p>Settings</p>
        </li>
      </ul>
    </div>
  );
}
