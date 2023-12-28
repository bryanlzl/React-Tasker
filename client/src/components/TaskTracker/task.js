import React, { useState } from "react";
import TaskForm from "./taskCreateForm";
import editIcon from "../../assets/icons/edit-icon.svg";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import checkIcon from "../../assets/icons/check-tick-icon.svg";
import emptyCircleIcon from "../../assets/icons/empty-circle-icon.svg";
import "../../styles/taskTracker/task.css";
import "../../styles/taskTracker/taskCreateForm.css";

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
  const renderCheck = () => {
    return isCompleted ? (
      <img
        alt="empty-circle-icon"
        className="custom-checkbox"
        src={checkIcon}
      />
    ) : (
      <img
        alt="empty-circle-icon"
        className="custom-checkbox"
        src={emptyCircleIcon}
      />
    );
  };

  return (
    <div className="task">
      <div className="task-entry">
        <div className={`task-entry-values ${strikeThrough}`}>
          <div className="task-index-entry">{taskKey}</div>
          <div>{taskName}</div>
          <div>{taskPriority}</div>
          <div>
            {dueDate.toLocaleString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
        </div>

        <input
          id={`taskCheckBox${taskKey}`}
          className="task-checkbox"
          type="checkbox"
          onChange={() => {
            taskChangeHandler("complete", taskId, {});
          }}
          checked={isCompleted}
        />

        <label htmlFor={`taskCheckBox${taskKey}`} className="custom-checkbox">
          {renderCheck()}
        </label>

        <button
          className="edit-remove-button"
          onClick={() => {
            setEdit(!isEdit);
          }}
        >
          <img className="edit-remove-icon" alt="edit-icon" src={editIcon} />
        </button>

        <button
          className="edit-remove-button"
          onClick={() => taskChangeHandler("delete", taskId, {})}
        >
          <img
            className="edit-remove-icon"
            alt="delete-icon"
            src={deleteIcon}
          />
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
          />
        </div>
      )}
    </div>
  );
}

export default Task;
