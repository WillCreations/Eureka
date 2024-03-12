import React from "react";

const Circle = ({ off, stroke }) => {
  return (
    <div>
      <svg className="" width="100%" height="100%">
        <circle
          id="Circler"
          className=""
          cx="50%"
          cy="50%"
          r="40%"
          stroke={stroke}
          strokeDashoffset={off}
        />
      </svg>
    </div>
  );
};

export default Circle;
