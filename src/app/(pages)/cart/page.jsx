import React from "react";
import CartRack from "@/app/components/CartRack";
import { updateStock } from "@/app/(Engine)/actions/updateStock";


export const metadata = {
  title: "Shopping Cart",
};

const Cart = () => {
  return (
    <div>
      <CartRack updateStock={updateStock} />
    </div>
  );
};

export default Cart;
