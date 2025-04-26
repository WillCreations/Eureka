"use client"
import SearchBar from "@/app/components/SearchBar";
import Link from "next/link";
import Category from "@/app/components/Category";
import ScrollToTop from "@/app/components/ScrollToTop";
import AltCategory from "@/app/components/AltCategory";
import { Suspense } from "react";
import Load from "@/app/loading";
import Loading from "@/app/components/Loading";
import Grid from "@/app/components/Grid";
import React, { useState } from "react";
import Image from "next/image";

const ProductPage = () => {


    const [cateSearch, setCateSearch] = useState("");
  const [allSearch, setAllSearch] = useState();

  const FetchFilter = async (cate) => {
    if (cate) {
      setCateSearch(cate);
    }
  };

  const Fetcher = () => {
    setAllSearch(Math.random());
    setCateSearch("");
  };

  const Functions = {
    FetchFilter: FetchFilter,
    Fetcher: Fetcher,
    cateSearch,
  };
  return (
    <div className="min-h-screen text-white">
      <div className="hidden mx-10 lg:mx-28 md:block">
        <div className=" flex justify-between items-center ">
          <h1 className=" text-4xl font-extrabold text-green-300 flex-1">
            Shop
          </h1>
          <SearchBar placeholder="Search Product..." />
        </div>
        <Category {...Functions} />
      </div>

      <div className="mx-10 md:hidden ">
        <div className="my-5">
          <SearchBar placeholder="Search Product..." />
        </div>
        <AltCategory {...Functions} />
      </div>

      <Suspense fallback={<Load />}>
        <Grid cateSearch={cateSearch} allSearch={allSearch} q={q}>
          <Loading />
        </Grid>
      </Suspense>
      <Link href="https://wa.me/qr/OCNXFD5QJOYXE1">
        <div className="fixed bg-green-500  bottom-20 rounded-full p-3 right-10 h-14 w-14 flex justify-center items-center  overflow-hidden transition cursor-pointer ">
          <Image
            style={{ objectFit: "contain" }}
            className="transition-transform hover:scale-110"
            src="/whatsapp.png"
            alt="whatsapp"
            width={50}
            height={50}
          />
        </div>
      </Link>
      <ScrollToTop />
    </div>
  )
}

export default ProductPage  