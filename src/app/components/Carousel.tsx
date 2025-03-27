"use client";
import Image from "next/image";
import React, { useContext } from "react";
import CarouselContext from "@/contextProvider/CarouselContextProvider";

const Carousel = ({ p }) => {
  const { active, Activator } = useContext(CarouselContext);

  console.log({ active });
  return (
    <div className="w-full p-5 items-center gap-5 grid grid-cols-4 h-80 bg-black rounded-md ">
      <div
        onClick={() => {
          Activator(p, "prev", null);
        }}
        className=" relative flex justify-center items-center appear col-span-1 bg-black rounded-md h-[60%] overflow-hidden "
      >
        <Image
          className="object-contain"
          src={
            p[active - 1]?.image ? p[active - 1]?.image : p[p.length - 1].image
          }
          width={500}
          height={500}
          alt={p[active - 1]?.name ? p[active - 1]?.name : p[p.length - 1].name}
        />

        <div className="absolute cursor-pointer opacity-[0.6] flex justify-center items-center appearObj left-0 right-0 top-0 bottom-0 ">
          <Image
            className="object-contain "
            src="/arrow.png"
            width={80}
            height={80}
            alt="previous"
          />
        </div>
      </div>

      <div className=" flex justify-center items-center col-span-2 bg-black rounded-md h-[100%] overflow-hidden ">
        {" "}
        <Image
          className="object-contain"
          src={p[active]?.image}
          width={500}
          height={500}
          alt={p[active]?.name}
        />
      </div>

      <div
        onClick={() => {
          Activator(p, "next", null);
        }}
        className="cursor-pointer relative appear col-span-1 flex justify-center items-center bg-black rounded-md h-[60%] overflow-hidden"
      >
        {" "}
        <Image
          className="object-contain"
          src={p[active + 1]?.image ? p[active + 1]?.image : p[0].image}
          width={500}
          height={500}
          alt={p[active + 1]?.name ? p[active + 1]?.name : p[0].name}
        />
        <div className="absolute cursor opacity-[0.6] flex justify-center items-center appearObj  left-0 right-0 top-0 bottom-0 ">
          <Image
            className="object-contain rotate-180"
            src="/arrow.png"
            width={80}
            height={80}
            alt="next"
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
