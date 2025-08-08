import React from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";

const Rating = ({ rate }) => {
  return (
    <div>
      {rate ? <IoStar className="text-green-300" /> : <IoStarOutline />}
    </div>
  );
};

export default Rating;
