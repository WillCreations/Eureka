"use client";
import { useState, useContext, useEffect } from "react";
import ProductCart from "@/contextProvider/Prod";
import CartButton from "@/app/components/CartButton";

const Box = ({ prod }) => {
  const [shower, setShower] = useState(true);
  const parallax = useContext(ProductCart);
  const change = parallax.Bool(prod._id);

  useEffect(() => {
    if (change) {
      setShower(false);
    }
  }, [change]);

  const HandleAdd = (SingleProd) => {
    console.log(SingleProd);
    const Id = SingleProd._id;
    console.log(Id, "idator");
    const trucer = parallax.Bool(Id);

    console.log(trucer, "trucer");

    if (trucer) {
      setShower(trucer);
      console.log(shower, "shower after");
      return parallax.Remove(Id);
    } else {
      setShower(trucer);
      console.log(shower, "shower after");
      return parallax.Add(SingleProd);
    }
  };

  return (
    <div className="w-full">
      <CartButton
        SingleProd={prod}
        show={shower ? "Add to Cart" : "remove"}
        AddHandler={HandleAdd}
        colour={shower ? "bg-green-300 text-black" : "bg-black text-white"}
      />
    </div>
  );
};

export default Box;
