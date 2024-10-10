"use client";

import Filter from "@/components/common/Filter";
import Loading from "@/components/common/Loading";
import PaginationButtons from "@/components/common/PaginationButtons";
import PaginationDetails from "@/components/common/PaginationDetails";
import ContentLayout from "@/components/layouts/ContentLayout";
import MainLayout from "@/components/layouts/MainLayout";
import { fetchRequestHistory } from "@/service/requestHistory";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { RiArrowDownSLine, RiSearchLine } from "react-icons/ri";

function RequestHistory() {
  const [filter, setFilter] = useState({
    user: "",
    status: "",
    type: "",
    dateFrom: "",
    dateTo: "",
  });

  const [data, setData] = useState([]);
  const [totalData, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

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
  };

  useEffect(() => {
    const getRequestHistory = async () => {
      const res = await fetchRequestHistory(1, 10);
      console.log(res);
    };

    getRequestHistory();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const getRequestHistory = async () => {
      try {
        const res = await fetchRequestHistory(page, limit);
        setData(res.result.data);
        setTotal(res.result.total);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    getRequestHistory();
  }, [page, limit]);

  return (
    <MainLayout>
      <ContentLayout>
        {data.length === 0 && <Loading />}
        {data.length > 0 && (
          <div>
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
              <Filter>
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
              </Filter>
            </div>
            <PaginationDetails
              limit={limit}
              page={page}
              totalData={totalData}
            />
            <div className="overflow-x-auto mb-2">
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
                      className="px-3 py-2 border border-r-0 border-black font-semibold whitespace-nowrap"
                    >
                      Request Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 border border-r-0 border-black font-semibold whitespace-nowrap"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 border border-r-0 border-black font-semibold whitespace-nowrap min-w-40"
                    >
                      Details
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 border border-r-0 border-black font-semibold whitespace-nowrap"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 border border-r-0 border-black font-semibold whitespace-nowrap"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-center border border-black rounded-tr-lg w-[5.5rem] font-semibold whitespace-nowrap"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="[&>*:nth-child(even)]:bg-neutral-200">
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td
                        className={`px-3 py-2 border border-t-0 border-r-0 border-black ${
                          data.length === index + 1 && "rounded-bl-lg"
                        }`}
                      >
                        {item.no}
                      </td>
                      <td className="px-3 py-2 border border-t-0 border-r-0 border-black">
                        {new Date(item.date).toLocaleString("in-ID", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        })}
                      </td>
                      <td className="px-3 py-2 border border-t-0 border-r-0 border-black">
                        {item.type}
                      </td>
                      <td className="px-3 py-2 border border-t-0 border-r-0 border-black max-w-64 ">
                        {item.details.length > 80 ? (
                          <>{item.details.slice(0, 80)}...</>
                        ) : (
                          <>{item.details}</>
                        )}
                      </td>
                      <td className="px-3 py-2 border border-t-0 border-r-0 border-black">
                        {item.status}
                      </td>
                      <td className="px-3 py-2 border border-t-0 border-r-0 border-black">
                        {item.user}
                      </td>
                      <td
                        className={`px-3 py-2 text-center border border-t-0 border-black text-medium text-blue-600 ${
                          data.length === index + 1 && "rounded-br-lg"
                        }`}
                      >
                        <Link href="/request-history/view/1">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <PaginationButtons totalData={totalData} />
          </div>
        )}
      </ContentLayout>
    </MainLayout>
  );
}

export default function RequestHistoryPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RequestHistory />
    </Suspense>
  );
}
