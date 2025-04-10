"use client";
import ProductCart from "@/contextProvider/Prod";
import { useState, useContext, useEffect } from "react";
import Multipier from "@/app/components/Multipier";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BuyButton = ({ prod }) => {
  const router = useRouter();
  const context = useContext(ProductCart);
  const prodo = context.Cart;
  const length = context.CartNumber;
  const [index, setIndex] = useState(-1);

  const HandleQuant = (prod, value) => {
    context.QuantHandle(prod, value);
  };

  const inside = context.Bool(prod[0]._id);
  console.log(inside, "insider");

  useEffect(() => {
    prodo.forEach((p, index) => {
      console.log(p, index, "cart index");

      if (p._id === prod[0]._id) {
        setIndex(index);
      }
    });
  }, [prodo]);

  console.log(index, "index find");

  const HandleCheckout = () => {
    router.push("/cart");
  };

  return (
    <div>
      <Multipier
        SingleProd={inside && index !== -1 ? prodo[index] : prod[0]}
        Quant={HandleQuant}
        disabler={inside}
      />

      <button
        disabled={!inside && true}
        className=" mt-5 text-lg text-black bg-green-300 rounded-lg font-semibold px-5 py-3"
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
