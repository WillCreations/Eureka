"use client";
import React, { useState } from "react";
import TaskColumn from "@/app/components/TaskColumn";

const DnD = () => {
  const [activeCard, setActivecard] = useState(0);
  const [tasks, setTasks] = useState([
    { title: "Create a 'todo' feature", stage: "todo" },
    { title: "Deploy your application", stage: "doing" },
    { title: "Add a reset feture to your application", stage: "done" },
  ]);
  const [newTask, setNewTask] = useState({
    title: "",
    stage: "Select Stage",
  });
  const Stages = [
    { title: "To Do", stage: "todo" },
    { title: "Doing", stage: "doing" },
    { title: "Done", stage: "done" },
  ];

  const handleDelete = (ind) => {
    const updatedTasks = tasks.filter((task, index) => index !== ind);
    setTasks(updatedTasks);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.stage === "Select Stage") return;
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setNewTask({ title: "", stage: "Select Stage" });
  };

  const onDrop = (stage, position) => {
    console.log({ stage, position });
    if (activeCard == null || activeCard === undefined) return;
    const taskToMove = tasks[activeCard];
    const updatedTasks = tasks.filter((task, index) => index !== activeCard);
    updatedTasks.splice(position, 0, {
      ...taskToMove,
      stage,
    });

    setTasks(updatedTasks);
  };

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };
  return (
    <div className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="col-span-1 text-2xl text-green-300 font-bold mt-5">
          Schedule New Task
        </div>
        <form
          className="grid grid-cols-3 col-span-1 gap-5"
          onSubmit={handleSubmit}
        >
          <input
            className="col-span-1 bg-[#121212] text-gray-300 p-5 rounded-md "
            type="text"
            name="title"
            onChange={handleChange}
            value={newTask.title}
            placeholder="Enter Title"
          />
          <select
            className="col-span-1 bg-[#121212] text-gray-300 p-5 rounded-md "
            name="stage"
            onChange={handleChange}
          >
            <option value="Select Stage">Select Stage</option>
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <button className="col-span-1 bg-green-300 text-black rounded-lg">
            Add New Task
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5 bg-[#121212] p-5 text-gray-400 rounded-lg">
        {Stages.map((Stage, index) => {
          return (
            <TaskColumn
              key={index}
              title={Stage.title}
              tasks={tasks}
              stage={Stage.stage}
              setActiveCard={setActivecard}
              handleDelete={handleDelete}
              onDrop={onDrop}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DnD;
