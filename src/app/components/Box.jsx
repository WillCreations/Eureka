"use client";
import { useState, useContext, useEffect } from "react";
import ProductCart from "@/contextProvider/Prod";
import CartButton from "@/app/components/CartButton";
import Toast from "./Toast";
 

const Box = ({ prod, updateStock }) => {
  const [shower, setShower] = useState(true);
  const parallax = useContext(ProductCart);
  const isNotInside = !parallax.Bool(prod._id);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const Cart = parallax.Cart;

  const ToastDisplay = (error) => {
    console.log({ toaster: error });
    setMessage(error);
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 5000);
  };

  useEffect(() => {
    console.log({ isNotInside });
    if (isNotInside) {
      setShower(isNotInside);
    }
  }, [isNotInside]);

  useEffect(() => {

      setShower(isNotInside);

    
  }, []);

  const HandleAdd = (SingleProd) => {
    const Id = SingleProd._id;
    const trucer = parallax.Bool(Id);

    if (trucer) {
      const i = parallax.index(Id);
      const currentCart = parallax.Cart;

      const newStock = currentCart[i].count;
      updateStock({ id: SingleProd._id, stock: newStock, type: "Inc" });
      setShower(trucer);
      return parallax.Remove(Id);
    } else {
      setShower(trucer);
      if (SingleProd.stock > 0) {
        updateStock({ id: SingleProd._id, stock: 1, type: "Dec" });
        return parallax.Add(SingleProd);
      }
    }
  };

  return (
    <div className="w-full">
      <CartButton
        ToastDisplay={ToastDisplay}
        SingleProd={prod}
        show={
          shower && !prod.stock
            ? "Out of stock"
            : shower
            ? "Add to Cart"
            : "remove"
        }
        isNotInCart={shower}
        AddHandler={HandleAdd}
        updateStock={updateStock}
        colour={shower ? "bg-green-300 text-black" : "bg-black text-white"}
      />
      {message && <Toast message={message} isError={isOpen} />}
    </div>
  );
};

export default Box;
