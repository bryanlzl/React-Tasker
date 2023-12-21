import React, { useState } from "react";
import TaskForm from "./taskCreateForm";
import "../../styles/taskTracker/task.css";

function Task(props) {
  const taskChangeHandler = props.taskChangeHandler;
  const { taskName, taskPriority, dueDate, isCompleted } = props.taskEntry.taskEntry;
  const taskKey = props.taskKey;
  const taskId = props.taskEntry.taskId;
  const [isEdit, setEdit] = useState(false);
  const strikeThrough = isCompleted && 'task-complete'

  return (
    <div>
      <div className="task-entry">
        <div className={`task-entry-values ${strikeThrough}`}>
          <div>{taskKey}</div>
          <div>{taskName}</div>
          <div>{taskPriority}</div>
          <div>{dueDate.toLocaleString()}</div>
        </div>
        <input
          type="checkbox"
          onClick={() => {
            taskChangeHandler('complete', taskId, {});
          }}
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
            isCompleted = {isCompleted}
          ></TaskForm>
        </div>
      )}
    </div>
  );
}

export default Task;
