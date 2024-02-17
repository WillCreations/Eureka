"use client";
import React, { useState, useEffect, useContext } from "react";
import ProductCart from "../../contextProvider/Prod";
import CartButton from "../components/CartButton";
import SearchBar from "@/app/components/SearchBar";
import Card from "../components/Card";
import Category from "@/app/components/Category";
import AltCategory from "@/app/components/AltCategory";

const Products = ({ searchParams }) => {
  const q = searchParams?.q || "";

  const [produce, setProduce] = useState([]);

  const Fetcher = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProduce(data);
  };

  useEffect(() => {
    Fetcher();
  }, []);

  useEffect(() => {
    const searchFilter = async () => {
      const response = await fetch(`/api/products/search?search=${q}`);
      const data = await response.json();
      setProduce(data);
    };
    searchFilter();
  }, [q]);

  const FetchFilter = async (cate) => {
    const response = await fetch(`/api/products/category?category=${cate}`);
    const data = await response.json();
    setProduce(data);
  };

  const parallax = useContext(ProductCart);

  const HandleAdd = (SingleProd) => {
    console.log(SingleProd);
    const Id = SingleProd._id;
    console.log(Id);
    const trucer = parallax.Bool(Id);

    if (trucer) {
      return parallax.Remove(Id);
    } else {
      return parallax.Add(SingleProd);
    }
  };

  const Functions = {
    FetchFilter: FetchFilter,
    Fetcher: Fetcher,
  };

  return (
    <div className="min-h-screen">
      <div className="hidden md:block">
        <div className="mx-10 md:mx-10 flex justify-between items-center pt-32">
          <h1 className=" text-2xl font-extrabold text-green-500 flex-1">
            Products
          </h1>
          <SearchBar placeholder="Search Product..." />
        </div>
        <Category {...Functions} />
      </div>

      <div className="mx-10 md:hidden pt-32">
        <SearchBar placeholder="Search Product..." />
        <AltCategory {...Functions} />
      </div>

      <div className="mx-10 md:mx-28 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {produce.map((Prod) => {
          return (
            <Card key={Prod._id} prod={Prod}>
              <CartButton
                SingleProd={Prod}
                show={parallax.Bool(Prod._id) ? "remove" : "Add to Cart"}
                AddHandler={HandleAdd}
                colour={
                  parallax.Bool(Prod._id)
                    ? "bg-red-700"
                    : "bg-yellow-500 text-black"
                }
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
