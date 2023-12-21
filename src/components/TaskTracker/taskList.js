import React, { useState } from "react";
import Task from "./task";
import TaskForm from "./taskCreateForm";
import "../../styles/taskTracker/task.css";

function TaskList(props) {
  const [sortMode, setSortMode] = useState({sortType: "index", sortAsc: true})
  const taskChangeHandler = props.taskChangeHandler;
  const taskList = props.taskList;
  
  const indexTable = {};
  let taskKeys = Object.keys(taskList);

  // Have to remove this once taskSortHandler is complete //
  taskKeys.map((key, index) => { 
    indexTable[key] = index + 1;
  });
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

  const taskSortHandler = (sortType, sortAsc) => {
    switch(sortType) {
      case "index": 
        if (sortAsc) {  
          taskKeys = Object.keys(taskKeys).sort()
          }
        else {
          taskKeys = Object.keys(taskKeys).sort((a, b) => b.localeCompare(a))
          }
        taskKeys.map((key, index) => {
          indexTable[key] = index + 1;
        });
        break;
      case "task":
        if (sortAsc) {  
          }
        else {
        }
        break;
      case "priority":
        if (sortAsc) {  
          }
        else {
        }  
        break;  
      case "duedate":
        if (sortAsc) {  
          }
        else {
        }  
        break;
      default:
        console.log('what the....')
    }
  }

  return (
    <div className="task-list">
      <div className={"task-entry-header task-column-header"}>
        <div>Index</div>
        <div>Task</div> 
        <div>Priority</div>
        <div>Due Date</div>
        <div>Completion</div>
      </div>
      {taskKeys.map((x) => {
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
