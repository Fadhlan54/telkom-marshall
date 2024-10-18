"use client";

import Loading from "@/components/common/Loading";
import PaginationButtons from "@/components/common/PaginationButtons";
import PaginationDetails from "@/components/common/PaginationDetails";
import ContentLayout from "@/components/layouts/ContentLayout";
import MainLayout from "@/components/layouts/MainLayout";
import { fetchElibrary } from "@/service/elibrary";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

function Elibrary() {
  const [books, setBooks] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  useEffect(() => {
    const getBooks = async () => {
      const res = await fetchElibrary(page, limit);
      setBooks(res.result.data);
      setTotalData(res.result.total);
      console.log(res);
    };
    getBooks();
  }, [page, limit]);
  return (
    <MainLayout>
      <ContentLayout>
        {totalData === 0 && <Loading />}
        {totalData > 0 && (
          <>
            <h1 className="text-center font-semibold text-xl mb-6">
              E-Library
            </h1>
            <div className="flex mb-3 text-xs text-neutral-500">
              <div className="relative flex">
                <label
                  htmlFor="type"
                  className="text-[0.62rem] absolute left-2 px-1 -translate-y-1/2 bg-white z-10"
                >
                  Ebook Type
                </label>
                <select
                  name="type"
                  id="type"
                  className="block py-2.5 px-3 border border-neutral-400  rounded-l-lg focus:outline-none appearance-none w-[5.5rem] font-medium bg-white"
                >
                  <option value="">all</option>
                  <option value="book">book</option>
                  <option value="journal">journal</option>
                  <option value="paper">paper</option>
                </select>
                <RiArrowDownSLine className="w-[1.1rem] h-[1.1rem] absolute pointer-events-none right-2 top-1/2 translate-y-[-50%]" />
              </div>

              <input
                id="search-title"
                type="text"
                className="py-1 px-3 border border-neutral-400 focus:outline-none rounded-r-lg border-l-0 w-full max-w-60"
                placeholder="Search title ..."
              />
            </div>
            <PaginationDetails
              limit={limit}
              page={page}
              totalData={totalData}
            />
            <div className="overflow-x-auto mb-2">
              <table className="w-full text-left rtl:text-right text-gray-500 text-xs mb-1 border-separate border-spacing-0">
                <thead className=" text-white uppercase bg-primary-1 text-center">
                  <tr className="">
                    <th
                      scope="col"
                      className="px-3 py-3 border border-r-0 text-start border-black rounded-l-lg font-semibold w-10 whitespace-nowrap"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 border-y text-start border-black font-semibold whitespace-nowrap "
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 border-y text-start border-black font-semibold whitespace-nowrap"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 border-y text-start border-black font-semibold whitespace-nowrap"
                    >
                      Competence Group
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 border-y text-start border-black font-semibold whitespace-nowrap"
                    >
                      Competence Name
                    </th>
                    <th
                      scope="col"
                      className="ps-3 pe-6 py-3 text-start border border-l-0 border-black rounded-r-lg font-semibold"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, index) => (
                    <tr key={index}>
                      <td className={`px-3 py-2.5 border-b border-black`}>
                        {book.no}
                      </td>
                      <td className="px-3 py-2.5 border-b border-black break-words min-w-40 max-w-[20rem]">
                        {book.title}
                      </td>
                      <td className="px-3 py-2.5 border-b border-black break-words">
                        {book.type}
                      </td>
                      <td className="px-3 py-2.5 border-b border-black break-words">
                        {book.competence.group}
                      </td>
                      <td className="px-3 py-2.5 border-b border-black break-words">
                        {book.competence.name}
                      </td>
                      <td
                        className={`ps-3 pe-6 py-2.5 text-start border-b border-black text-primary-1 font-semibold`}
                      >
                        <Link href="/request-history/view/1">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <PaginationButtons totalData={totalData} />
          </>
        )}
      </ContentLayout>
    </MainLayout>
  );
}

export default function ElibraryPage() {
  return (
    <Suspense>
      <Elibrary />
    </Suspense>
  );
}
