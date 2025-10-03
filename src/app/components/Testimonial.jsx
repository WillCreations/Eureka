import Image from "next/image";
import React from "react";
import Rating from "@/app/components/Rating";

import { useMemo } from "react";

const Testimonial = ({ client }) => {
  const { name, image, profession, business, comment, rate } = client;

  // Memoize stars for performance
  const stars = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className="py-1"
          aria-label={i < rate ? "Filled star" : "Empty star"}
        >
          <Rating rate={i < rate} />
        </span>
      )),
    [rate]
  );

  return (
    <section className="p-5">
      <div className="w-full grid gap-5 grid-cols-3 items-center">
        <div className="flex col-span-1 justify-center items-center">
          <div className="w-20 h-20 md:w-40 md:h-40 flex justify-center items-center rounded-full bg-green-300 overflow-hidden">
            <Image
              className="object-cover w-full h-full"
              src={image}
              height={160}
              width={160}
              alt={name}
              priority
            />
          </div>
        </div>
        <div className="flex flex-col col-span-2 justify-between h-full">
          <div className="flex items-center gap-3">
            <span
              className="text-2xl text-green-300 font-semibold"
              aria-label={`Rating: ${rate} out of 5`}
            >
              {rate}.0
            </span>
            <div className="flex text-2xl">{stars}</div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-green-300 leading-tight">
              {name}
            </h1>
            <h2 className="text-gray-300 text-lg">
              {profession} - {business}
            </h2>
          </div>
        </div>
      </div>
      <blockquote className="my-5 text-gray-300 italic text-2xl border-l-4 border-green-300 pl-4">
        {`"${comment}"`}
      </blockquote>
    </section>
  );
};

export default Testimonial;
