import React from "react";

const ConfirmComp = ({ item, setConfirm, Action }) => {
  return (
    <div className="flex  justify-center items-center px-5  ">
      <div className="flex text-gray-300 flex-col gap-5 justify-center items-center rounded-2xl   p-5 bg-black">
        <div>
          Do you want to{" "}
          <span className="text-green-300 font-bold">{item}</span>?
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={() => {
              document.body.style.overflow = "auto";
              Action();
            }}
            className="w-24 h-14 mr-1 rounded-2xl px-2 bg-green-300 text-black"
          >
            Yes
          </button>
          <button
            onClick={() => {
              setConfirm(false);
              document.body.style.overflow = "auto";
            }}
            className="w-24 h-14 ml-1 rounded-2xl px-2 bg-[#121212] text-green-300"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmComp;
