import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function PaginationDetails({ limit, page, totalData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
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
  const handleLimitChange = (newLimit) => {
    const newTotalPages = Math.ceil(totalData / newLimit);

    setQueryParams({
      limit: newLimit,
      page: Math.min(page, newTotalPages),
    });
  };
  return (
    <div className="flex items-center gap-2 justify-between text-xs md:text-sm mb-2">
      <div>
        <p>
          Showing <span className="font-medium">{limit * (page - 1) + 1}</span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(limit * page, totalData)}
          </span>{" "}
          of <span className="font-medium">{totalData}</span> entries
        </p>
      </div>
      <div className="flex items-center gap-1">
        <p>Show</p>
        <select
          value={limit}
          onChange={(e) => {
            handleLimitChange(e.target.value);
          }}
          className="border border-neutral-400 px-2 py-1 rounded-md"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <p>entries</p>
      </div>
    </div>
  );
}
