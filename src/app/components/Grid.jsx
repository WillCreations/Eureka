import React, { useState, useEffect, useContext } from "react";
import CartButton from "../components/CartButton";
import Card from "../components/Card";
import ProductCart from "../../contextProvider/Prod";
import { useRouter } from "next/navigation";
import Multi from "@/app/components/Multi";
import Toast from "./Toast";

const Grid = ({updateStock, cateSearch, allSearch, q, children, actions }) => {
  const [produce, setProduce] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const router = useRouter();
  const { checkLike, unlikeProduct, likeProduct, fetchProductLikes } = actions;
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const ToastDisplay = (error) => {
    console.log({ toaster: error });
    setMessage(error);
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 5000);
  };

  const Fetcher = async () => {
    setIsLoading(false);
    const response = await fetch("/api/products", { next: { revalidate: 0 } });
    const data = await response.json();
    if (response) {
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
    }
  }, [cateSearch]);

  const parallax = useContext(ProductCart);

  const HandleAdd = (SingleProd) => {
    console.log(SingleProd);
    const Id = SingleProd._id;
    console.log(Id);
    const trucer = parallax.Bool(Id);

    if (trucer) {

      const i = parallax.index(Id);
      const currentCart = parallax.Cart;

      const newStock = currentCart[i].count;
      updateStock({ id: SingleProd._id, stock: newStock, type: "Inc" });
      return parallax.Remove(Id);
    } else {
       if (SingleProd.stock > 0) {
        updateStock({ id: SingleProd._id, stock: 1, type: "Dec" });
        return parallax.Add(SingleProd);
      }
    
    }
  };

  if (!isLoading) {
    return <div> {children}</div>;
  } else {
    return (
      <div className="px-5 xxs:px-10 lg:px-28 grid gap-5 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {produce.map((Prod) => {
          return (
            <Card
              key={Prod._id}
              prod={Prod}
              checkerAction={checkLike}
              likerAction={likeProduct}
              dislikerAction={unlikeProduct}
              likesfetchAction={fetchProductLikes}
            >
              {parallax.Bool(Prod._id) ? (
                <Multi updateStock={updateStock} ToastDisplay={ToastDisplay} SingleProd={Prod} />
              ) : (
                <CartButton
                  message={message}
                  isOpen={isOpen}
                  ToastDisplay={ToastDisplay}
                  SingleProd={Prod}
                  show={!parallax.Bool(Prod._id) && !Prod.stock ? "Out of stock": !parallax.Bool(Prod._id)? "Add to Cart" :"remove"}
                  AddHandler={HandleAdd}
                   isNotInCart={!parallax.Bool(Prod._id)}
                  colour={
                    parallax.Bool(Prod._id)
                      ? "bg-red-700"
                      : "bg-green-300 text-black"
                  }
                />
              )}
            </Card>
          );
        })}
        {message && <Toast message={message} isError={isOpen} />}
      </div>
    );
  }
};

export default Grid;
