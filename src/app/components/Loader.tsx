import React from "react";

const Loader = ({ progress }: { progress: number }) => {
  return (
    <div className="border-solid border-2 p-3 h-10 w-60 rounded-full border-white">
      <div
        className="bg-green-500 h-full rounded-full "
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Loader;
