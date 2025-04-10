"use client";
import Card from "@/app/components/Card";
import CartButton from "@/app/components/CartButton";
import { useState, useEffect, useContext } from "react";
import ProductCart from "@/contextProvider/Prod";

const CompGrid = ({ prodo, cluster }) => {
  const parallax = useContext(ProductCart);

  const many = JSON.parse(prodo);
  const one = JSON.parse(cluster);

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
      <div className="grid sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {many.map((p) => {
          if (p._id !== one._id) {
            console.log("see: ", p._id, one._id);
            return (
              <div
                className={`${
                  p.name === one.name &&
                  " border-solid rounded-md border-8 border-yellow-500"
                }`}
                key={p}
              >
                <Card prod={p}>
                  <CartButton
                    SingleProd={p}
                    show={parallax.Bool(p._id) ? "remove" : "Add to Cart"}
                    AddHandler={HandleAdd}
                    colour={
                      parallax.Bool(p._id)
                        ? "bg-black text-white"
                        : "bg-green-300 text-black"
                    }
                  />
                </Card>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default CompGrid;
