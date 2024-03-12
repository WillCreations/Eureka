"use client";
import SearchBar from "@/app/components/SearchBar";

import Category from "@/app/components/Category";
import AltCategory from "@/app/components/AltCategory";
import { Suspense } from "react";
import Load from "@/app/loading";
import Loading from "@/app/components/Loading";
import Grid from "@/app/components/Grid";
import React, { useState } from "react";

const Products = ({ searchParams }) => {
  const q = searchParams?.q || "";
  const [cateSearch, setCateSearch] = useState();
  const [allSearch, setAllSearch] = useState();

  const FetchFilter = async (cate) => {
    if (cate) {
      setCateSearch(cate);
    }
  };

  const clear = () => {
    setCateSearch("");
  };

  const Fetcher = () => {
    setAllSearch(Math.random());
  };

  const Functions = {
    FetchFilter: FetchFilter,
    Fetcher: Fetcher,
  };
  return (
    <div className="min-h-screen">
      <div className="hidden md:block">
        <div className="mx-10 md:mx-10 flex justify-between items-center ">
          <h1 className=" text-2xl font-extrabold text-green-500 flex-1">
            Products
          </h1>
          <SearchBar placeholder="Search Product..." />
        </div>
        <Category {...Functions} />
      </div>

      <div className="mx-10 md:hidden ">
        <SearchBar placeholder="Search Product..." />
        <AltCategory {...Functions} />
      </div>

      <Suspense fallback={<Load />}>
        <Grid cateSearch={cateSearch} clear={clear} allSearch={allSearch} q={q}>
          <Loading />
        </Grid>
      </Suspense>
      <div className="fixed bg-yellow-500 text-black bottom-20 rounded-full px-5 py-3 right-10 hover:bg-black hover:text-yellow-500 transition cursor-pointer ">
        w
      </div>
      <div
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className="fixed bg-green-500 text-black bottom-5 rounded-full px-5 py-3 right-10 hover:bottom-3 active:bottom-5 transition cursor-pointer "
      >
        x
      </div>
    </div>
  );
};

export default Products;
