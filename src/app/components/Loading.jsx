import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div>
      <div className="px-5 xxs:px-10 lg:px-28 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(10)].map((p, index) => {
          return (
            <div
              key={index}
              className="animate-pulse h-auto w-[400] rounded-md overflow-hidden bg-gray-300"
            >
              <div className="w-full h-64  rounded-md bg-[#121212] animate-pulse"></div>
              <div className="p-5">
                <div>
                  <h2 className="w-[80%] h-10 rounded-md bg-[#121212] animate-pulse "></h2>
                  <h2 className="w-[50%]  rounded-md bg-[#121212] animate-pulse mt-2 h-5"></h2>
                </div>

                <div className="flex justify-end rounded-md bg-[#121212] h-14 mt-5"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Loading;
