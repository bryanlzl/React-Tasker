import React, { useState } from "react";
import TaskList from "./taskList";
import "../../styles/taskTracker/task.css";

function TaskTracker() {
  let tempDueDate = new Date();

  const [tasks, setTasks] = useState({
    0: {
      taskName: "Make bed",
      taskPriority: "Low",
      dueDate: tempDueDate,
      isCompleted: false,
    },
    1: {
      taskName: "Make breakfast",
      taskPriority: "High",
      dueDate: tempDueDate,
      isCompleted: false,
    },
  });

  const taskChangeHandler = (action, idx, changes) => {
    // CHANGE == changes is a dict of changed values for idx
    // CREATE == changes is a dict of the new task
    if (action === "delete") {
      setTasks((prev) => {
        const curr = { ...prev };
        delete curr[idx];
        return curr;
      });
    } else if (action === "create") {
      setTasks((prev) => {
        const keysList = Object.keys(prev);
        const newIdx = keysList.length ? Number(Math.max(...keysList)) + 1 : 0;
        return { ...prev, [newIdx]: { ...changes } };
      });
    } else if (action === "edit") {
      setTasks((prev) => {
        return { ...prev, [idx]: { ...changes } };
      });
    } else if (action === "complete") {
      setTasks((prev) => {
        return {
          ...prev,
          [idx]: { ...prev[idx], isCompleted: !prev[idx].isCompleted },
        };
      });
    }
  };

  return (
    <div className="task-tracker">
      <h2>To-do List Maker:</h2>
      <TaskList
        taskList={tasks}
        taskChangeHandler={taskChangeHandler}
      ></TaskList>
    </div>
  );
}

export default TaskTracker;
