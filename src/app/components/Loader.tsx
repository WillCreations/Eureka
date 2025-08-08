import React from "react";

const Loader = ({ progress }: { progress: number }) => {
  return (
    <div className="border-solid animate-pulse border-2 border-gray-300 p-3 h-10 w-60 rounded-full ">
      <div
        className="bg-green-300 h-full rounded-full "
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Loader;
