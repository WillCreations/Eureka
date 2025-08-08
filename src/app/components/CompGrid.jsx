"use client";
import Card from "@/app/components/Card";
import CartButton from "@/app/components/CartButton";
import { useState, useEffect, useContext } from "react";
import ProductCart from "@/contextProvider/Prod";
import Toast from "@/app/components/Toast"

const CompGrid = ({ prodo, cluster, actions, updateStock}) => {
  const parallax = useContext(ProductCart);
  const { checkLike, unlikeProduct, likeProduct, fetchProductLikes } = actions;
  const many = JSON.parse(prodo);
  const one = JSON.parse(cluster);
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

  return (
    <div>
      <h1 className="text-2xl text-green-500 font-extrabold my-5">
        Similar Products
      </h1>
      <div className="grid sm:grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {many.map((p, index) => {
          if (p._id !== one._id) {
            return (
              <Card
                key={index}
                prod={p}
                checkerAction={checkLike}
                likerAction={likeProduct}
                dislikerAction={unlikeProduct}
                likesfetchAction={fetchProductLikes}
              >
                <CartButton
                ToastDisplay={ToastDisplay}
                  SingleProd={p}
                  show={!parallax.Bool(p._id) && !p.stock ? "Out of stock": !parallax.Bool(p._id)? "Add to Cart" :"remove"}
                  AddHandler={HandleAdd}
                  updateStock={updateStock}
                   isNotInCart={!parallax.Bool(p._id)}
                  colour={
                    parallax.Bool(p._id)
                      ? "bg-black text-white"
                      : "bg-green-300 text-black"
                  }
                />
              </Card>
            );
          }
        })}
      </div>
    </div>
  );
};

export default CompGrid;
