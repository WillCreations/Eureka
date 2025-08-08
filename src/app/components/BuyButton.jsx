"use client";
import ProductCart from "@/contextProvider/Prod";
import { useState, useContext, useEffect } from "react";
import Multipier from "@/app/components/Multipier";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BuyButton = ({ prod, updateStock }) => {
  const router = useRouter();
  const context = useContext(ProductCart);
  const prodo = context.Cart;
  const length = context.CartNumber;
  const [index, setIndex] = useState(-1);

  const HandleQuant = (prod, value) => {
    return context.QuantHandle(prod, value);
  };

  const inside = context.Bool(prod[0]._id);

  useEffect(() => {
    prodo.forEach((p, index) => {
      if (p._id === prod[0]._id) {
        setIndex(index);
      }
    });
  }, [prodo]);

  const HandleCheckout = () => {
    router.push("/cart");
  };

  return (
    <div>
      <Multipier
        SingleProd={inside && index !== -1 ? prodo[index] : prod[0]}
        Quant={HandleQuant}
        disabler={inside}
        updateStock={updateStock}
      />

      <button
        disabled={!inside && true}
        className=" mt-5 w-full text-lg text-black bg-green-300 rounded-lg font-semibold px-5 py-5"
        onClick={() => {
          HandleCheckout;
        }}
      >
        <Link href={"/cart"}>BUY</Link>
      </button>
    </div>
  );
};

export default BuyButton;
