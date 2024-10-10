"use client";

import ContentLayout from "@/components/layouts/ContentLayout";
import MainLayout from "@/components/layouts/MainLayout";
import Modal from "@/components/modals/Modal";
import Link from "next/link";
import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import {
  RiBook3Line,
  RiFileAddLine,
  RiLoopLeftFill,
  RiTimeFill,
  RiVerifiedBadgeFill,
} from "react-icons/ri";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <MainLayout>
      {showModal && <Modal setShowModal={setShowModal} />}
      <ContentLayout>
        <div className="flex flex-wrap gap-4 justify-between">
          <div>
            <p className="font-semibold leading-4">Halo, Admin</p>
            <p className="text-sm text-neutral-400">
              Let&apos;s start your project review now!{" "}
            </p>
          </div>
          <div className="text-neutral-600 text-sm hidden sm:flex w-full max-w-72 h-fit ">
            <label
              htmlFor="search-reference"
              className="flex items-center bg-neutral-200 p-2 rounded-s-lg"
            >
              <HiSearch className="w-4 h-4" />
            </label>
            <input
              type="text"
              className="bg-neutral-200 rounded-e-lg outline-none w-full py-2 pe-4 block"
              id="search-reference"
              placeholder="Search reference"
            />
          </div>
        </div>
        <div className="my-4 flex flex-wrap md:flex-nowrap gap-2 ">
          <div className="w-full sm:w-7/12 md:5/12 mb-2 flex flex-col justify-between">
            <div>
              <p className="font-semibold leading-4">Project</p>
              <p className="text-sm mb-2 text-neutral-400">
                New Project, New Opportunity, Start Now
              </p>
            </div>

            <div className="flex flex-col gap-2 h-48">
              <Link
                href={"/"}
                className="bg-neutral-200 p-4 flex items-center gap-2 h-1/2 rounded-xl"
              >
                <div className="h-full py-2">
                  <RiFileAddLine className="h-full w-auto" />
                </div>

                <div>
                  <p className="text-sm md:text-base font-semibold leading-4">
                    Create
                  </p>
                  <p className="text-xs text-neutral-400">
                    New Project, New Opportunity Start Now!
                  </p>
                </div>
              </Link>
              <Link
                href={"/"}
                className="bg-neutral-200 p-4 flex items-center gap-2 h-1/2 rounded-xl"
              >
                <div className="h-full py-2">
                  <RiBook3Line className="h-full w-auto" />
                </div>

                <div>
                  <p className="text-sm md:text-base font-semibold leading-4">
                    E-Library
                  </p>
                  <p className="text-xs text-neutral-400">
                    New Project, New Opportunity Start Now!
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="w-full sm:w-10/12 md:w-7/12 flex flex-col justify-between">
            <div>
              <p className="font-semibold leading-4">Reference</p>
              <p className="text-sm mb-2 text-neutral-400">
                Select reference that you need
              </p>
            </div>

            <div className="text-neutral-600 text-sm flex sm:hidden mb-2 w-full h-fit ">
              <label
                htmlFor="search-reference"
                className="flex items-center bg-neutral-200 p-2 rounded-s-xl"
              >
                <HiSearch className="w-4 h-4" />
              </label>
              <input
                type="text"
                className="bg-neutral-200 rounded-e-xl outline-none w-full py-2 pe-4 block"
                id="search-reference"
                placeholder="Search reference"
              />
            </div>
            <div className="flex gap-2 w-full h-48 mb-2">
              <div className="w-1/3 bg-neutral-200 rounded-xl"></div>
              <div className="w-1/3  bg-neutral-200 rounded-xl"></div>
              <div className="w-1/3 bg-neutral-200 rounded-xl"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap gap-2">
          <div className="w-full sm:w-9/12 lg:7/12">
            <p className="font-semibold ">Your project Update</p>
            <table className="text-xs table border-spacing-y-2 border-separate w-full">
              <thead>
                <tr className="bg-neutral-200 border-white table-row">
                  <th className="font-semibold px-2 py-1 border-l-8 border-neutral-500 rounded-s-lg text-start">
                    Date
                  </th>
                  <th className="font-semibold px-2 py-1 text-start">Type</th>
                  <th className="font-semibold ps-2 pe-4 py-1 rounded-e-lg text-start">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-neutral-200 text-neutral-600">
                  <td className=" py-1 px-2 border-l-8 border-neutral-500 rounded-s-lg">
                    Wed, 18 Sep 2024 13:35:34
                  </td>
                  <td className="px-2 py-1">Generate Module</td>
                  <td className="ps-2 pe-4 py-1 rounded-e-lg">Waiting</td>
                </tr>
                <tr className="bg-neutral-200 text-neutral-600">
                  <td className=" py-1 px-2 border-l-8 border-neutral-500 rounded-s-lg ">
                    Wed, 18 Sep 2024 13:35:34
                  </td>
                  <td className="px-2 py-1">Generate Module</td>
                  <td className="ps-2 pe-4 py-1 rounded-e-lg">Waiting</td>
                </tr>
                <tr className="bg-neutral-200 rounded-lg text-neutral-600">
                  <td className=" py-1 px-2 border-l-8 border-neutral-500  rounded-s-lg">
                    Wed, 18 Sep 2024 13:35:34
                  </td>
                  <td className="px-2 py-1">Generate Module</td>
                  <td className="ps-2 pe-4 py-1 rounded-e-lg">Waiting</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full sm:w-7/12 md:5/12">
            <p className="font-semibold mb-2">Statistic</p>
            <div className="flex w-full gap-2">
              <div className=" w-1/3 bg-neutral-200 rounded-lg text-center pb-6">
                <div className="bg-neutral-300 w-full py-3 rounded-t-lg ">
                  <RiVerifiedBadgeFill className="mx-auto w-6 h-6" />
                </div>
                <div className="px-2 mt-2 ">
                  <p className="text-xl font-semibold">8</p>
                  <p className="text-sm text-neutral-500">Done</p>
                </div>
              </div>
              <div className=" w-1/3 bg-neutral-200 rounded-lg text-center pb-6">
                <div className="bg-neutral-300 w-full py-3 rounded-t-lg ">
                  <RiLoopLeftFill className="mx-auto w-6 h-6" />
                </div>
                <div className="px-2 mt-2 ">
                  <p className="text-xl font-semibold">2</p>
                  <p className="text-sm text-neutral-500">Processing</p>
                </div>
              </div>
              <div className=" w-1/3 bg-neutral-200 rounded-lg text-center pb-6">
                <div className="bg-neutral-300 w-full py-3 rounded-t-lg ">
                  <RiTimeFill className="mx-auto w-6 h-6" />
                </div>
                <div className="px-2 mt-2 ">
                  <p className="text-xl font-semibold">3</p>
                  <p className="text-sm text-neutral-500">Waiting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </MainLayout>
  );
}
