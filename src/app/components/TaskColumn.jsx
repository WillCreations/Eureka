import React from "react";
import Task from "@/app/components/Task";
import DropZone from "@/app/components/DropZone";

const TaskColumn = ({
  title,
  tasks,
  stage,
  setActiveCard,
  onDrop,
  handleDelete,
}) => {
  return (
    <div className="bg-black min-h-40 rounded-lg p-5">
      <div className="4xl text-green-300 font-bold mb-5">{title}</div>
      <DropZone
        tasks={tasks}
        stage={stage}
        onDrop={() => {
          onDrop(stage, 0);
        }}
      />
      {tasks.map((task, index) => {
        return task.stage === stage ? (
          <React.Fragment key={index}>
            <Task
              task={task}
              index={index}
              stage={stage}
              setActiveCard={setActiveCard}
              handleDelete={handleDelete}
            />
            <DropZone
              onDrop={() => {
                onDrop(stage, index + 1);
              }}
            />
          </React.Fragment>
        ) : null;
      })}
    </div>
  );
};

export default TaskColumn;
