import React, { useState, useEffect } from "react";

const DropZone = ({ onDrop, tasks, stage }) => {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  const DropChecker = () => {
    const hasContent = tasks?.some((task) => task.stage === stage);

    console.log({ stage, hasContent });
    if (hasContent === undefined) {
      setActive(false);
    } else if (hasContent === false) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    DropChecker();
  }, [tasks]);
  return (
    <div
      className={`${
        active && hover
          ? "opacity-100  p-5 border-solid border-2 border-green-300  transition-all rounded-md  h-20  mb-5"
          : active
          ? "opacity-100  p-5  border-solid border-2 border-[#121212] transition-all rounded-md  h-20  mb-5"
          : "opacity-0 p-0 m-0 h-1 w-full"
      }`}
      onDragEnter={() => {
        setActive(true);
        setHover(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setActive(true);
        setHover(true);
      }}
      onDragLeave={() => {
        setActive(false);
        setHover(false);
        DropChecker();
      }}
      onDrop={() => {
        onDrop();
        setActive(false);
        setHover(false);
      }}
    >
      Drop Here
    </div>
  );
};

export default DropZone;
