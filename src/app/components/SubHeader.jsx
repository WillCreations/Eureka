import React from "react";

const SubHeader = ({ tag }) => {
  return (
    <h2 className="text-4xl  xxs:text-3xl my-10 font-black text-green-300 text-center">
      {tag}
    </h2>
  );
};

export default SubHeader;
