"use client";
import React, { useState, useRef, useEffect } from "react";

const Toast = ({ message, isError }) => {
  const toastRef = useRef(null);

  useEffect(() => {
    console.log({ isError });
    if (isError) {
      console.log({ Toast: toastRef.current });

      toastRef.current.classList.add("pop_in");
    } else {
      console.log({ Toast: toastRef.current });
      toastRef.current.classList.remove("pop_in");
      toastRef.current.classList.add("pop_out");
    }
  }, [isError]);
  return (
    <div ref={toastRef} className={`pop_in`}>
      <div className="rounded-2xl text-center bg-green-300 w-[90%] sm:w-[400px] text-black px-10 py-8">
        {message}
      </div>
    </div>
  );
};

export default Toast;
