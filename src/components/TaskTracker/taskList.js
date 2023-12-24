import React, { useState, useEffect, useMemo } from "react";
import Task from "./task";
import TaskForm from "./taskCreateForm";
import "../../styles/taskTracker/task.css";

function TaskList(props) {
  const taskChangeHandler = props.taskChangeHandler;
  const taskList = props.taskList;
  const priorityMap = { Low: 1, Medium: 2, High: 3 };
  let taskKeys = [];
  Object.keys(taskList)
    .sort()
    .map((key, index) => {
      taskKeys.push([key, index + 1]);
    });
  const [sortState, setSortState] = useState({
    index: true,
    task: true,
    priority: true,
    dueDate: true,
  });
  const [currSort, setCurrSort] = useState("index");

  const sortByDate = (key1, key2) => {
    const dueDate1 = key1[0];
    const dueDate2 = key2[0];
    return dueDate2 - dueDate1;
  };

  const taskSortHandler = (sortType, sortAsc) => {
    const iTable = {};
    switch (sortType) {
      case "index":
        if (sortAsc) {
        } else {
          taskKeys = taskKeys.reverse();
        }
        taskKeys.map((key, index) => {
          iTable[index] = taskKeys[index];
          index++;
        });
        return iTable;
      case "task":
        taskKeys.map((key, index) => {
          taskKeys[index] = [taskList[key[0]].taskName, ...key];
        });
        taskKeys = taskKeys.sort();
        if (!sortAsc) {
          taskKeys = taskKeys.reverse();
        }
        for (let index = 0; index < taskKeys.length; index++) {
          taskKeys[index] = [taskKeys[index][1], taskKeys[index][2]];
          iTable[index] = taskKeys[index];
        }
        return iTable;
      case "priority":
        taskKeys.map((key, index) => {
          taskKeys[index] = [
            priorityMap[taskList[key[0]].taskPriority],
            ...key,
          ];
        });
        taskKeys = taskKeys.sort();
        if (!sortAsc) {
          taskKeys = taskKeys.reverse();
        }
        for (let index = 0; index < taskKeys.length; index++) {
          taskKeys[index] = [taskKeys[index][1], taskKeys[index][2]];
          iTable[index] = taskKeys[index];
        }
        return iTable;
      case "dueDate":
        taskKeys.map((key, index) => {
          taskKeys[index] = [taskList[key[0]].dueDate, ...key];
        });
        taskKeys = taskKeys.sort(sortByDate);
        if (!sortAsc) {
          taskKeys = taskKeys.reverse();
        }
        for (let index = 0; index < taskKeys.length; index++) {
          taskKeys[index] = [taskKeys[index][1], taskKeys[index][2]];
          iTable[index] = taskKeys[index];
        }
        return iTable;
      default:
        console.log("what the....");
    }
  };

  const indexTable = useMemo(() => {
    return taskSortHandler(currSort, sortState[currSort]);
  }, [taskKeys, currSort, sortState]);

  return (
    <div className="task-list">
      <div className={"task-entry-header task-column-header"}>
        <div
          className="task-header"
          onClick={() => {
            setSortState((prev) => {
              return { ...prev, index: !prev["index"] };
            });
            setCurrSort("index");
          }}
        >
          Index
        </div>
        <div
          className="task-header"
          onClick={() => {
            setSortState((prev) => {
              return { ...prev, task: !prev["task"] };
            });
            setCurrSort("task");
          }}
        >
          Task
        </div>
        <div
          className="task-header"
          onClick={() => {
            setSortState((prev) => {
              return { ...prev, priority: !prev["priority"] };
            });
            setCurrSort("priority");
          }}
        >
          Priority
        </div>
        <div
          className="task-header"
          onClick={() => {
            setSortState((prev) => {
              return { ...prev, dueDate: !prev["dueDate"] };
            });
            setCurrSort("dueDate");
          }}
        >
          Due Date & Time
        </div>
        <div className="task-header">Completed</div>
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
