import Image from "next/image";
import React from "react";

const Email = ({ messenger }) => {
  const receiver = JSON.parse(messenger);
  const { firstName, lastName, message } = receiver;
  return (
    <div className="bg-white my-10 rounded-md p-5 text-black ">
      <div className="flex  my-2 items-center">
        <div className="flex mr-2 mb-2  items-center">
          <Image
            src={"avatar/brandlogo.svg"}
            alt={"Eureka logo"}
            className="object-cover"
            width={20}
            height={10}
          />
        </div>
        <h1 className="p-0 font-bold text-2xl text-blue-300">Eureka</h1>
      </div>

      <h1 className="capitalize font-semibold text-green-500 text-xl">{`Hello ${firstName} ${lastName}`}</h1>
      <h3 className="italic py-3">{message}</h3>
    </div>
  );
};

export default Email;
