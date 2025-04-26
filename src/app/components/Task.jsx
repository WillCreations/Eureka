import React from "react";

const Task = ({ task, index, setActiveCard, handleDelete }) => {
  return (
    <div
      className="p-5 bg-[#121212] relative rounded-md cursor-grab active:opacity-70 active:border-2 active:border-green-300 active:border-solid active:cursor-grabbing  h-20  mb-5"
      draggable={true}
      onDragStart={() => setActiveCard(index)}
    >
      <div>{task.title}</div>
      <div
        className="text-green-300 text-md absolute cursor-pointer top-1 right-1 px-3 py-1 rounded-md bg-black"
        onClick={() => {
          handleDelete(index);
        }}
      >
        x
      </div>
    </div>
  );
};

export default Task;
