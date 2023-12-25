import React, { useState, useEffect } from "react";
import TaskList from "./taskList";
import "../../styles/taskTracker/task.css";

function TaskTracker() {
  let tempDueDate = new Date();

  const [tasks, setTasks] = useState({
    0: {
      taskName: "Make bed",
      taskPriority: "Low",
      dueDate: new Date(tempDueDate.getTime() + 1231286400000),
      isCompleted: false,
    },
    1: {
      taskName: "Breakfast",
      taskPriority: "High",
      dueDate: new Date(tempDueDate.getTime() + 12382122460),
      isCompleted: false,
    },
    2: {
      taskName: "Popcorn",
      taskPriority: "Medium",
      dueDate: new Date(tempDueDate.getTime() + 8645500),
      isCompleted: false,
    },
    3: {
      taskName: "Watch movie",
      taskPriority: "Low",
      dueDate: new Date(tempDueDate.getTime() + 81201233123),
      isCompleted: false,
    },
  });

  const taskChangeHandler = (action, idx, changes) => {
    // CHANGE == changes is a dict of changed values for idx
    // CREATE == changes is a dict of the new task
    if (action === "delete") {
      setTasks((prev) => {
        const filteredTasks = Object.entries(prev)
          .filter((key) => parseInt(key) !== idx)
          .map(([, value]) => value);
        const newTasks = {};
        filteredTasks.forEach((task, index) => {
          newTasks[index] = task;
        });
        return newTasks;
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

  /*useEffect(() => {
    console.log(tasks);
  }, [tasks]);*/

  return (
    <div className="task-tracker">
      <div className="task-tracker-content">
        <h2>To-do List Maker:</h2>
        <TaskList
          taskList={tasks}
          taskChangeHandler={taskChangeHandler}
        ></TaskList>
      </div>
    </div>
  );
}

export default TaskTracker;
