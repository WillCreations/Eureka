"use client";
import React, { useState } from "react";

const CartButton = ({
  ToastDisplay,
  SingleProd,
  AddHandler,
  isNotInCart,
  show,
  colour,
}) => {
  const HandleAdd = () => {
    const res = AddHandler(SingleProd);
    console.log({ res });
    ToastDisplay(res);
  };
  return (
    <button
      disabled={SingleProd.stock <= 0 && isNotInCart}
      className={`py-5 px-5 rounded-2xl w-full capitalize transition-all disabled:bg-gray-300 active:scale-105 ${colour}`}
      onClick={() => {
        HandleAdd();
      }}
    >
      {show}
    </button>
  );
};

export default CartButton;
