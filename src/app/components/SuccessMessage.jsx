import React from "react";

const SuccessMessage = ({ success }) => {
  return (
    <div className="text-green-300 border-2 my-2  border-green-500 border-solid p-5 w-[90%] bg-black rounded-2xl">
      {success}
    </div>
  );
};

export default SuccessMessage;
