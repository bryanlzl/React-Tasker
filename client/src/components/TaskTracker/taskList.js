import React, { useState, useMemo } from "react";
import Task from "./task";
import TaskForm from "./taskCreateForm";
import "../../styles/taskTracker/taskList.css";
import ascIcon from "../../assets/icons/asc-arrow.svg";
import descIcon from "../../assets/icons/desc-arrow.svg";

function TaskList(props) {
  const taskChangeHandler = props.taskChangeHandler;
  const taskList = props.taskList;
  const priorityMap = { Low: 1, Medium: 2, High: 3 };
  let taskKeys = Object.keys(taskList)
    .sort()
    .map((key, index) => [key, index + 1]);
  const [sortState, setSortState] = useState({
    index: true,
    task: true,
    priority: true,
    dueDate: true,
    completed: true,
  });
  const sortByDate = (key1, key2) => {
    const dueDate1 = key1[0];
    const dueDate2 = key2[0];
    return dueDate2 - dueDate1;
  };
  const [currSort, setCurrSort] = useState("index");
  const highlightTaskHeader = (sortType) => {
    let cssHeaderSort = String();
    switch (currSort) {
      case "index":
        cssHeaderSort = "index-header-sort";
        break;
      case "task":
        cssHeaderSort = "task-name-header-sort";
        break;
      case "priority":
        cssHeaderSort = "priority-header-sort";
        break;
      case "dueDate":
        cssHeaderSort = "date-header-sort";
        break;
      case "completed":
        cssHeaderSort = "completed-header-sort";
        break;
      default:
        break;
    }
    return currSort === sortType
      ? `task-header-sort ${cssHeaderSort}`
      : "task-header";
  };
  const renderSortArrow = (sortType) => {
    return (
      currSort === sortType &&
      (sortState[currSort] ? (
        <img className="sort-arrow-icon" alt="asc-arrow" src={ascIcon} />
      ) : (
        <img className="sort-arrow-icon" alt="desc-arrow" src={descIcon} />
      ))
    );
  };

  const taskSortHandler = (sortType, sortAsc) => {
    let iTable = {};
    const iTableCompiler = () => {
      taskKeys = taskKeys.map((key) => [key[1], key[2]]);
      iTable = taskKeys.map((key) => key);
    };
    switch (sortType) {
      case "index":
        if (sortAsc) {
        } else {
          taskKeys = taskKeys.reverse();
        }
        iTable = taskKeys.map((key) => key);
        return iTable;
      case "task":
        taskKeys = taskKeys
          .map((key) => [taskList[key[0]].taskName.toUpperCase(), ...key])
          .sort();
        taskKeys = !sortAsc ? taskKeys.reverse() : taskKeys;
        iTableCompiler();
        return iTable;
      case "priority":
        taskKeys = taskKeys
          .map((key) => [priorityMap[taskList[key[0]].taskPriority], ...key])
          .sort();
        taskKeys = !sortAsc ? taskKeys.reverse() : taskKeys;
        iTableCompiler();
        return iTable;
      case "dueDate":
        taskKeys = taskKeys
          .map((key) => [taskList[key[0]].dueDate, ...key])
          .sort(sortByDate);
        taskKeys = !sortAsc ? taskKeys.reverse() : taskKeys;
        iTableCompiler();
        return iTable;
      case "completed":
        taskKeys = taskKeys
          .map((key) => [taskList[key[0]].isCompleted, ...key])
          .sort();
        taskKeys = !sortAsc ? taskKeys.reverse() : taskKeys;
        iTableCompiler();
        return iTable;
      default:
        console.log("what the....");
    }
  };

  /* eslint-enable react-hooks/exhaustive-deps */
  const indexTable = useMemo(() => {
    return taskSortHandler(currSort, sortState[currSort]);
  }, [taskKeys, currSort, sortState]);
  /* eslint-disable react-hooks/exhaustive-deps */

  return (
    <div className="task-list">
      <div className={"task-entry-header task-column-header"}>
        <div
          className={highlightTaskHeader("index")}
          onClick={() => {
            setSortState((prev) => {
              return { ...prev, index: !prev["index"] };
            });
            setCurrSort("index");
          }}
        >
          Index
          {renderSortArrow("index")}
        </div>
        <div
          className={highlightTaskHeader("task")}
          onClick={() => {
            setSortState((prev) => {
              return { ...prev, task: !prev["task"] };
            });
            setCurrSort("task");
          }}
        >
          Task
          {renderSortArrow("task")}
        </div>
        <div
          className={highlightTaskHeader("priority")}
          onClick={() => {
            setSortState((prev) => {
              return { ...prev, priority: !prev["priority"] };
            });
            setCurrSort("priority");
          }}
        >
          Priority
          {renderSortArrow("priority")}
        </div>
        <div
          className={highlightTaskHeader("dueDate")}
          onClick={() => {
            setSortState((prev) => {
              return { ...prev, dueDate: !prev["dueDate"] };
            });
            setCurrSort("dueDate");
          }}
        >
          Due Date & Time
          {renderSortArrow("dueDate")}
        </div>
        <div
          className={highlightTaskHeader("completed")}
          onClick={() => {
            setSortState((prev) => {
              return { ...prev, completed: !prev["completed"] };
            });
            setCurrSort("completed");
          }}
        >
          <p className="task-done-header">Done</p>
          {renderSortArrow("completed")}
        </div>
      </div>
      {Object.keys(indexTable).map((x) => {
        return (
          <Task
            key={indexTable[x][1]}
            taskKey={indexTable[x][1]}
            taskEntry={{
              taskEntry: taskList[indexTable[x][0]],
              taskId: Number(indexTable[x][0]),
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
