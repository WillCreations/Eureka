import Image from "next/image";
import React from "react";

const Testimonial = ({ client }) => {
  const { name, image, profession, business, comment } = client;
  return (
    <div className="bg-[#121212] rounded-2xl p-5">
      <div className="w-full flex justify-center">
        <div className="w-40 h-40 rounded-full  bg-green-300 overflow-hidden  ">
          <Image
            className="object-cover"
            src={image}
            height={500}
            width={500}
            alt={name}
          />
        </div>
      </div>
      <div className="my-3">
        <h1 className="text-xl text-green-300">{name}</h1>
        <h2 className="text-gray-300">
          {profession} - {business}
        </h2>
        <div className="text-gray-300 italic text-2xl my-5">
          <p>{`"${comment}"`}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
