import React from "react";

const Input = ({ setInput, input, name }) => {
  const HandleChange = (e) => {
    setInput({ ...input, [name]: e.target.value });
  };

  return (
    <input
      className="rounded-2xl w-full text-gray-300 bg-black py-5 text-center px-3"
      name={name}
      max={9}
      min={0}
      type="number"
      onChange={HandleChange}
    />
  );
};

export default Input;
