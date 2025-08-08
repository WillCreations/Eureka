import React from "react";

const UserDetails = ({ tag, value }) => {
  return (
    <div className=" font-light text-xl items-center gap-3 grid grid-cols-1  md:grid-cols-2 w-full text-green-300">
      <div>{`${tag}:`}</div>
      <div className="bg-black p-5 rounded-2xl w-full">
        <span className="text-xl text-blue-200">{value}</span>
      </div>
    </div>
  );
};

export default UserDetails;
