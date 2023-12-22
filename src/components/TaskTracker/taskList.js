import React, { useState, useEffect, useMemo } from "react";
import Task from "./task";
import TaskForm from "./taskCreateForm";
import "../../styles/taskTracker/task.css";

function TaskList(props) {
  const taskChangeHandler = props.taskChangeHandler;
  const taskList = props.taskList;
  let taskKeys = Object.keys(taskList);

  const [sortState, setSortState] = useState({
    index: true,
    task: true,
    priority: true,
    dueDate: true,
  });

  const [currSort, setCurrSort] = useState("index");

  const taskSortHandler = (sortType, sortAsc) => {
    const iTable = {};
    switch (sortType) {
      case "index":
        if (sortAsc) {
          taskKeys = taskKeys.sort();
        } else {
          taskKeys = taskKeys.sort((a, b) => b.localeCompare(a));
        }
        taskKeys.map((key, index) => {
          iTable[index + 1] = Number(key);
        });
        return iTable;
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

  const indexTable = useMemo(() => {
    return taskSortHandler(currSort, sortState["index"]);
  }, [taskKeys, currSort, sortState]);

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
            taskEntry={{
              taskEntry: taskList[indexTable[x]],
              taskId: Number(indexTable[x]),
            }}
            taskChangeHandler={taskChangeHandler}
            taskSortHandler={taskSortHandler}
            taskSortState={{ currSort: currSort, sortState: sortState }}
          />
        );
      })}
      <TaskForm
        formType="create"
        taskEditHandler={taskChangeHandler}
        taskSortHandler={taskSortHandler}
        taskSortState={{ currSort: currSort, sortState: sortState }}
      ></TaskForm>
    </div>
  );
}

export default TaskList;
