import React, { useState } from "react";
import TaskForm from "./taskCreateForm";
import "../styles/taskTracker/task.css";
import TaskList from "./taskList";

function Task(props) {
  const taskChangeHandler = props.taskChangeHandler;
  const { taskName, taskPriority, dueDate } = props.taskEntry.taskEntry;
  const taskId = props.taskEntry.taskId;
  const [isEdit, setEdit] = useState(false);

  return (
    <div>
      <div className="task-entry">
        <div>{taskName}</div>
        <div>{taskPriority}</div>
        <div>{dueDate.toLocaleString()}</div>
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
          ></TaskForm>
        </div>
      )}
    </div>
  );
}

export default Task;
