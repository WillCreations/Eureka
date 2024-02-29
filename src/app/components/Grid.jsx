import React, { useState, useEffect, useContext } from "react";
import CartButton from "../components/CartButton";
import Card from "../components/Card";
import ProductCart from "../../contextProvider/Prod";
import { useRouter } from "next/navigation";
import Multi from "@/app/components/Multi";

const Grid = ({ cateSearch, allSearch, q, clear, children }) => {
  const [produce, setProduce] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const router = useRouter();

  const Fetcher = async () => {
    router.refresh;
    setIsLoading(false);
    const response = await fetch("/api/products", { next: { revalidate: 0 } });
    const data = await response.json();
    if (response) {
      router.refresh;
      setIsLoading(true);
      console.log(isLoading, "Loader");
    }
    setProduce(data);
  };

  useEffect(() => {
    Fetcher();
  }, []);

  useEffect(() => {
    Fetcher();
  }, [allSearch]);

  useEffect(() => {
    const searchFilter = async () => {
      router.refresh;
      setIsLoading(false);
      const response = await fetch(`/api/products/search?search=${q}`, {
        next: { revalidate: 0 },
      });
      if (response) {
        setIsLoading(true);
        console.log(isLoading, "Loader");
      }
      const data = await response.json();
      setProduce(data);
    };
    searchFilter();
  }, [q]);

  const FetchFilter = async (cate) => {
    setIsLoading(false);
    router.refresh;
    const response = await fetch(`/api/products/category?category=${cate}`, {
      next: { revalidate: 0 },
    });
    if (response) {
      setIsLoading(true);
      console.log(isLoading, "Loader");
    }
    const data = await response.json();
    setProduce(data);
  };

  useEffect(() => {
    if (cateSearch) {
      FetchFilter(cateSearch);
      clear();
    }
  }, [cateSearch]);

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

  if (!isLoading) {
    return <div> {children}</div>;
  } else {
    return (
      <div className="mx-10 md:mx-28 grid gap-5 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {produce.map((Prod) => {
          return (
            <Card key={Prod._id} prod={Prod}>
              {parallax.Bool(Prod._id) ? (
                <Multi SingleProd={Prod} />
              ) : (
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
              )}
            </Card>
          );
        })}
      </div>
    );
  }
};

export default Grid;
