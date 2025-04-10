"use client";
import Loader from "@/app/components/Loader";
import React, { useEffect, useState } from "react";

const Load = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timmer = setInterval(() => {
      setProgress((prev) => {
        return prev < 100 ? prev + 10 : 100;
      });
    }, 1000);

    return () => {
      clearInterval(timmer);
      setProgress(0);
    };
  }, []);
  return (
    // <Loading/>
    <div className="min-h-screen box-border flex justify-center  ">
      <div className="flex flex-col justify-center items-center">
        <Loader progress={progress} />
        <h1 className="text-3xl my-5 text-green-300 ">Loading...</h1>
      </div>
    </div>
  );
};

export default Load;
