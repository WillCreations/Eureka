import React, { useState, useEffect } from "react";

const Counter = ({ total, tag }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const Counting = setInterval(() => {
      if (count === total) {
        return setCount(total);
      } else {
        setCount((prevCount) => {
          return (prevCount += 1);
        });
      }
    }, 100);
    return () => {
      clearInterval(Counting);
    };
  }, [count]);

  return (
    <div className="flex flex-col items-center justify-center h-40 p-5 gap-5">
      <div className="text-4xl text-green-300 font-bold"> {`${count}+`}</div>
      <div>{tag}</div>
    </div>
  );
};

export default Counter;
