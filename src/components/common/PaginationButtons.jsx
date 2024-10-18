import { useCallback } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationButtons({ totalData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const totalPages = Math.ceil(totalData / limit);

  const setQueryParams = useCallback(
    (newParams) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      Object.keys(newParams).forEach((key) => {
        params.set(key, newParams[key]);
      });

      const newUrl = `?${params.toString()}`;
      router.replace(newUrl, { scroll: false });
    },
    [router, searchParams]
  );

  const handlePageChange = (pageNumber) => {
    setQueryParams({ page: pageNumber });
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const delta = 2;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (page <= 3) {
        startPage = 1;
        endPage = Math.min(5, totalPages);
      } else if (page >= totalPages - 2) {
        startPage = Math.max(totalPages - 4, 1);
        endPage = totalPages;
      } else {
        startPage = page - delta;
        endPage = page + delta;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-2 py-1 rounded ${
            page === i ? "bg-primary-1 text-white" : "text-black"
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex justify-center items-center text-sm">
      <div className="flex items-center">
        <button
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          className=" disabled:text-gray-400"
        >
          <FiChevronsLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className=" disabled:text-gray-400"
        >
          <FiChevronLeft className="w-4 h-4 mr-1" />
        </button>
        {getPaginationButtons()}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className=" disabled:text-gray-400"
        >
          <FiChevronRight className="w-4 h-4 ml-1" />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
          className=" disabled:text-gray-400"
        >
          <FiChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
