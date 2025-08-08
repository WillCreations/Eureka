import React from "react";

const SubHeader = ({ tag }) => {
  return (
    <h2 className="text-4xl xxs:text-2xl my-5 font-black text-green-300 text-center">
      {tag}
    </h2>
  );
};

export default SubHeader;
