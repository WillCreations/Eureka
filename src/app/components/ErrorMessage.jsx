import React from "react";

const ErrorMessage = ({ error }) => {
  return (
    <div className="text-red-500 border-2 my-2  border-red-500 border-solid p-5 w-[90%] bg-black rounded-2xl">
      {error}
    </div>
  );
};

export default ErrorMessage;
