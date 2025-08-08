"use client";
import React, { useRef, useEffect } from "react";
import { category } from "@/Category";

const Category = ({ FetchFilter, Fetcher, cateSearch, catego }) => {
  const categoryRef = useRef(null);

  useEffect(() => {
    categoryRef.current.addEventListener("wheel", (e) => {
      e.preventDefault();
      categoryRef.current.scrollLeft += e.deltaY;
    });
  });
  return (
    <div ref={categoryRef} className="overflow-x-auto w-full">
      <ul className="flex gap-5 justify-between py-5 my-5 ">
        <li className="text-center">
          <button
            className={`${
              cateSearch === ""
                ? "bg-green-300 text-black"
                : "bg-[#121212] text-white"
            } w-full rounded-xl p-5 my-2`}
            onClick={() => {
              Fetcher();
            }}
          >
            All
          </button>
        </li>

        {catego.slice(0).map((c, index) => (
          <li key={index}>
            <button
              className={`${
                cateSearch === c.category
                  ? "bg-green-300 text-black"
                  : "bg-[#121212] text-white"
              } w-full rounded-xl p-5 my-2`}
              onClick={() => {
                FetchFilter(c.category);
              }}
            >
              {c.category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
