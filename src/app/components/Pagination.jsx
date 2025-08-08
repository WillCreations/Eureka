"use client";
import React from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
const Pagination = ({ Count }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);
  const ITEM_PER_PAGE = 5;

  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < Count;
  const pageTotal = Count / ITEM_PER_PAGE;

  const HandlePageChange = (Type) => {
    Type === "Prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="flex justify-between">
      <button
        className="flex items-center float-right disabled:bg-[#121212] disabled:text-gray-300 bg-[#121212] my-2 text-green-300 p-5 text-2xl font-black  rounded-full cursor-pointer"
        disabled={!hasPrev}
        onClick={() => {
          HandlePageChange("Prev");
        }}
      >
        <FaAngleLeft />
      </button>
      <div className="px-10 py-3 flex items-center rounded-md font-semibold my-2 bg-[#121212] text-green-300">
        {`${page} / ${Math.ceil(pageTotal)}`}
      </div>
      <button
        className="flex items-center float-right disabled:bg-[#121212] disabled:text-gray-300 bg-[#121212] my-2 text-green-300 p-5 text-2xl font-black rounded-full cursor-pointer "
        disabled={!hasNext}
        onClick={() => {
          HandlePageChange("Next");
        }}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Pagination;
