"use client";

import ContentLayout from "@/components/layouts/ContentLayout";
import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiFilter2Fill,
  RiFilter2Line,
  RiSearchLine,
} from "react-icons/ri";

export default function RequestHistory() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const filterRef = useRef();
  const buttonFilterRef = useRef();
  const [filter, setFilter] = useState({
    user: "",
    status: "",
    type: "",
    dateFrom: "",
    dateTo: "",
  });

  const toggleFilter = (e) => {
    e.preventDefault();
    setIsFilterVisible(!isFilterVisible);
  };

  const handleFilterChange = (e, type) => {
    e.preventDefault();
    setFilter({ ...filter, [type]: e.target.value });
  };

  const resetFilter = (e) => {
    e.preventDefault();
    setFilter({
      user: "",
      status: "",
      type: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  const applyFilter = (e) => {
    e.preventDefault();
    setIsFilterVisible(false);
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
    <MainLayout>
      <ContentLayout>
        <h1 className="text-center font-semibold text-xl mb-4">
          Request History
        </h1>
        <div className="flex mb-3 text-xs text-neutral-500">
          <label
            htmlFor="search-details"
            className="flex items-center p-2 ps-3 border border-r-0 rounded-l-md border-neutral-400"
          >
            <RiSearchLine className="w-4 h-4" />
          </label>
          <input
            id="search-details"
            type="text"
            className="py-1 pe-3 border border-neutral-400 focus:outline-none rounded-r-md border-l-0 w-full max-w-56"
            placeholder="Search details..."
          />

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
                className="border border-neutral-400 px-3 py-3 rounded-md bg-white shadow-bottom-xl absolute -bottom-1 translate-y-full right-0 md:right-1/2 md:translate-x-1/2  w-fit z-10"
                ref={filterRef}
              >
                <label htmlFor="search-user">User</label>
                <input
                  type="text"
                  id="search-user"
                  className="min-w-72 mt-0.5 py-2 px-2 border border-neutral-400 rounded-md focus:outline-none"
                  placeholder="Filter by user..."
                  onChange={(e) => handleFilterChange(e, "user")}
                  value={filter.user}
                  autoComplete="off"
                />
                <div className="flex gap-2 mt-2">
                  <div className="w-1/2 relative">
                    <label htmlFor="type">Type</label>
                    <select
                      name="type"
                      id="type"
                      className="block w-full mt-0.5 py-2 px-2 border border-neutral-400 rounded focus:outline-none appearance-none"
                      onChange={(e) => handleFilterChange(e, "type")}
                      value={filter.type}
                    >
                      <option value="">All</option>
                      <option value="review">Review Module</option>
                      <option value="generate">Generate Module</option>
                      <option value="extract">Extract E-book</option>
                      <option value="coqa">Generate CoQa</option>
                      <option value="module">Mapping Module</option>
                      <option value="ebook">Mapping E-book</option>
                      <option value="audio">Module to Audio</option>
                      <option value="ebooktoaudio">E-book to Audio</option>
                    </select>
                    <RiArrowDownSLine className="w-[1.1rem] h-[1.1rem] absolute right-1 top-1/2 pointer-events-none" />
                  </div>
                  <div className="w-1/2 relative">
                    <label htmlFor="type">Status</label>
                    <select
                      name="status"
                      id="status"
                      className="block w-full mt-0.5 py-2 px-2 border border-neutral-400 rounded focus:outline-none appearance-none"
                      onChange={(e) => handleFilterChange(e, "status")}
                      value={filter.status}
                    >
                      <option value="all">All</option>
                      <option value="done">Done</option>
                      <option value="processing">Processing</option>
                      <option value="waiting">Waiting</option>
                      <option value="error">Error</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <RiArrowDownSLine className="w-[1.1rem] h-[1.1rem] absolute right-1 top-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="w-1/2">
                    <label htmlFor="type">Created from</label>
                    <input
                      type="date"
                      id="type"
                      className="w-full mt-0.5 py-2 px-2 border border-neutral-400 rounded focus:outline-none"
                      max={
                        filter.dateTo
                          ? new Date(filter.dateTo).toISOString().split("T")[0]
                          : new Date().toISOString().split("T")[0]
                      }
                      onChange={(e) => handleFilterChange(e, "dateFrom")}
                      value={filter.dateFrom}
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="type">to</label>
                    <input
                      type="date"
                      id="type"
                      className="w-full mt-0.5 py-2 px-2 border border-neutral-400 rounded focus:outline-none"
                      min={
                        filter.dateFrom &&
                        new Date(filter.dateFrom).toISOString().split("T")[0]
                      }
                      max={new Date().toISOString().split("T")[0]}
                      onChange={(e) => handleFilterChange(e, "dateTo")}
                      value={filter.dateTo}
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-alert-danger text-white rounded"
                    onClick={(e) => resetFilter(e)}
                  >
                    Reset
                  </button>
                  <button
                    className="px-4 py-2 bg-alert-success text-white rounded"
                    onClick={(e) => applyFilter(e)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-gray-500 border-separate border-spacing-0 text-xs">
            <thead className=" text-gray-700 uppercase bg-gray-50 text-center">
              <tr className="bg-neutral-200">
                <th
                  scope="col"
                  className="px-3 py-2 border border-r-0 border-black rounded-tl-lg font-semibold w-10 whitespace-nowrap"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 border border-r-0 border-black font-semibold"
                >
                  Request Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 border border-r-0 border-black font-semibold"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 border border-r-0 border-black font-semibold"
                >
                  Details
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 border border-r-0 border-black font-semibold"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 border border-r-0 border-black font-semibold"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-center border border-black rounded-tr-lg w-28 font-semibold"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&>*:nth-child(even)]:bg-neutral-200">
              <tr>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black">
                  1
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  2022-01-03
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  Generate Module
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black max-w-64">
                  [TC-105 Natural Language Processing]_Advancing Natural
                  Language Processing
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  Processing
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  John Doe
                </td>
                <td className="px-3 py-2 text-center border border-t-0 border-black text-blue-600 font-semibold">
                  <Link href="/request-history/view/1">View</Link>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black">
                  2
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  2022-01-02
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  Mapping Module
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words max-w-64">
                  How To Use Consultative Selling For Revenue Growth
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  done
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  John Doe
                </td>
                <td className="px-3 py-2 text-center border border-t-0 border-black text-blue-600 font-semibold">
                  <Link href="/request-history/view/1">View</Link>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black rounded-bl-lg">
                  3
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  2022-01-01
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  Ebook to Audio
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words max-w-64">
                  How To Use Consultative Selling For Revenue Growth
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  cancelled
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  John Doe
                </td>
                <td className="px-3 py-2 text-center border border-t-0 border-black rounded-br-lg text-blue-600 font-semibold">
                  <Link href="/request-history/view/1">View</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ContentLayout>
    </MainLayout>
  );
}
