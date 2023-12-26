import React, { useState, useEffect } from "react";
import TaskList from "./taskList";
import axios from "axios";
import "../../styles/taskTracker/task.css";

function TaskTracker() {
  const [tasks, setTasks] = useState({});
  const saveChangeHandler = () => {
    axios
      .post("http://localhost:5000/api/tasks/update", tasks)
      .then((res) => {})
      .catch((error) => console.log(error));
  };
  const fetchDBTasks = () => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((res) => {
        const taskList = {};
        Object.entries(res.data).forEach(([key, value]) => {
          taskList[key] = {
            taskName: value.task_name,
            taskPriority: value.task_priority,
            dueDate: new Date(value.due_date),
            isCompleted: value.is_completed,
          };
        });
        setTasks({ ...taskList });
      })
      .catch((error) => console.log(error));
  };
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

  useEffect(() => {
    fetchDBTasks();
  }, []);

  return (
    <div className="task-tracker">
      <div className="task-tracker-content">
        <h2>To-do List Maker:</h2>
        <TaskList
          taskList={tasks}
          taskChangeHandler={taskChangeHandler}
        ></TaskList>
        <div>
          <button onClick={saveChangeHandler}>Save Changes</button>
          <button onClick={fetchDBTasks}>Discard Changes</button>
        </div>
      </div>
    </div>
  );
}

export default TaskTracker;
