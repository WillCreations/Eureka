"use client";
import React, { useContext } from "react";

import CarouselContext from "@/contextProvider/CarouselContextProvider";
import Image from "next/image";

const CarouselGrid = ({ picture }) => {
  const { active, Activator } = useContext(CarouselContext);

  return (
    <div className="grid grid-cols-5 mt-5 gap-2 border-solid border-x-2 border-green-300">
      {picture.map((p, index) => {
        return (
          <div key={index} className="flex justify-center w-full">
            <div
              className={`${
                active === index ? "border-green-300 " : "border-black"
              } border-solid border-4 col-span-1 h-fit w-fit  rounded-md overflow-hidden `}
              onClick={() => {
                Activator(picture, null, index);
              }}
            >
              <Image
                className="object-contain"
                src={p.image}
                width={100}
                height={100}
                alt={p.name}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CarouselGrid;
