import React from "react";

const Error = ({ error, reset }) => {
  return (
    <div className="min-h-screen my-5 px-10 lg:px-28 text-white">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[400px] rounded-lg border-solid border-2 border-[#121212] h-[200px] p-10 flex flex-col items-center">
          <div className="text-2xl text-green-300 text-left">
            {error.message}
          </div>
          <button
            className=" my-10 bg-[#121212] rounded-lg hover:text-black hover:bg-green-300 px-5 py-2"
            onClick={reset}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
