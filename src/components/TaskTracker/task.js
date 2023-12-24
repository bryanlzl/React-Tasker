import React, { useState, useEffect } from "react";
import TaskForm from "./taskCreateForm";
import "../../styles/taskTracker/task.css";

function Task(props) {
  const taskChangeHandler = props.taskChangeHandler;
  const { taskName, taskPriority, dueDate, isCompleted } =
    props.taskEntry.taskEntry;

  const taskSortHandler = props.taskSortHandler;
  const { currSort, sortState } = props.taskSortState;
  const taskKey = props.taskKey;
  const taskId = props.taskEntry.taskId;
  const [isEdit, setEdit] = useState(false);
  const strikeThrough = isCompleted && "task-complete";

  return (
    <div>
      <div className="task-entry">
        <div className={`task-entry-values ${strikeThrough}`}>
          <div>{taskKey}</div>
          <div>{taskName}</div>
          <div>{taskPriority}</div>
          <div>
            {dueDate.toLocaleString([], {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
        <input
          className="task-checkbox"
          type="checkbox"
          onChange={() => {
            taskChangeHandler("complete", taskId, {});
          }}
          checked={isCompleted}
        />
        <button
          onClick={() => {
            setEdit(!isEdit);
          }}
        >
          Edit
        </button>
        <button onClick={() => taskChangeHandler("delete", taskId, {})}>
          Delete
        </button>
      </div>
      {isEdit && (
        <div className="task-edit-form">
          <TaskForm
            formType="edit"
            taskId={taskId}
            taskEditHandler={taskChangeHandler}
            isOpen={setEdit}
            isCompleted={isCompleted}
            taskSortHandler={taskSortHandler}
            taskSortState={{ currSort: currSort, sortState: sortState }}
          ></TaskForm>
        </div>
      )}
    </div>
  );
}

export default Task;
