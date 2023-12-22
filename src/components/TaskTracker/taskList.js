import React, { useState, useEffect } from "react";
import Task from "./task";
import TaskForm from "./taskCreateForm";
import "../../styles/taskTracker/task.css";

function TaskList(props) {
  const taskChangeHandler = props.taskChangeHandler;
  const taskList = props.taskList;
  let taskKeys = Object.keys(taskList);
  const iTable = {};
  taskKeys.map((key, index) => {
    iTable[key] = index + 1;
  });

  const [sortState, setSortState] = useState({
    index: true,
    task: true,
    priority: true,
    dueDate: true,
  });

  const [currSort, setCurrSort] = useState("index");

  const [indexTable, setIndexTable] = useState(iTable);

  const taskSortHandler = (sortType, sortAsc) => {
    const iTable = {};
    switch (sortType) {
      case "index":
        if (sortAsc) {
          taskKeys = Object.keys(taskKeys).sort();
        } else {
          taskKeys = Object.keys(taskKeys).sort((a, b) => b.localeCompare(a));
        }
        taskKeys.map((key, index) => {
          iTable[key] = index + 1;
        });
        setIndexTable(iTable);
        break;
      case "task":
        if (sortAsc) {
        } else {
        }
        break;
      case "priority":
        if (sortAsc) {
        } else {
        }
        break;
      case "duedate":
        if (sortAsc) {
        } else {
        }
        break;
      default:
        console.log("what the....");
    }
  };

  useEffect(() => {
    taskSortHandler(currSort, sortState["index"]);
  }, [sortState, currSort]);

  return (
    <div className="task-list">
      <div className={"task-entry-header task-column-header"}>
        <div
          onClick={() => {
            setSortState((prev) => {
              return { ...prev, index: !prev["index"] };
            });
            setCurrSort("index");
          }}
        >
          Index
        </div>
        <div>Task</div>
        <div>Priority</div>
        <div>Due Date</div>
        <div>Completion</div>
      </div>
      {Object.keys(indexTable).map((x) => {
        return (
          <Task
            key={indexTable[x]}
            taskKey={indexTable[x]}
            taskEntry={{ taskEntry: taskList[x], taskId: x }}
            taskChangeHandler={taskChangeHandler}
          />
        );
      })}
      <TaskForm
        formType="create"
        taskEditHandler={taskChangeHandler}
      ></TaskForm>
    </div>
  );
}

export default TaskList;
