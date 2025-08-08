import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const Like = ({ liked, setLiked, likes }) => {
  return (
    <div
      onClick={() => {
        setLiked();
      }}
      className="absolute cursor-pointer text-green-300 text-2xl  shadow-md font-extrabold bg-[#121212] flex gap-1 items-center  rounded-xl bottom-1 left-1 px-5 py-2"
    >
      <div>{liked ? <IoHeart /> : <IoHeartOutline />}</div>
      {likes ? (
        <div className="text-sm font-normal text-gray-300">{ likes === 1 ? `${likes} Like`: `${likes} Likes` }</div>
      ) : null}
    </div>
  );
};

export default Like;
