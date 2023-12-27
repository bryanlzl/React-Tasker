import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { enGB } from "date-fns/locale";
import checkIcon from "../../assets/icons/check-tick-icon.svg";
import cancelIcon from "../../assets/icons/cancel-icon.svg";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/taskTracker/taskCreateForm.css";

function TaskCreateForm(props) {
  // formType == 'create' or 'edit'
  const formType = props.formType;
  const taskEditHandler = props.taskEditHandler;
  const taskSortHandler = props.taskSortHandler;
  const { currSort, sortState } = props.taskSortState;
  const taskId = formType === "edit" ? props.taskId : -1;
  const closeEdit = formType === "edit" ? props.isOpen : -1;
  const isCompleted = formType === "edit" ? props.isCompleted : false;
  const [taskForm, setTaskForm] = useState({
    taskName: "",
    taskPriority: "Low",
    dueDate: new Date(),
    isCompleted: isCompleted,
  });

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    value = name === "dueDate" ? new Date(value) : value;
    setTaskForm((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    taskEditHandler(formType, taskId, taskForm);
  };

  useEffect(() => {
    taskSortHandler(currSort, sortState["index"]);
  }, [sortState, currSort, taskEditHandler]);

  return (
    <div>
      <form
        className={formType === "edit" ? "task-edit-form" : "task-create-form"}
        onSubmit={handleSubmit}
      >
        <div />
        <input
          type="text"
          name="taskName"
          placeholder="Rename Task"
          onChange={handleInputChange}
        />
        <select
          name="taskPriority"
          onChange={handleInputChange}
          defaultValue="Low"
        >
          <option value="Low">Change</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <DatePicker
          className="my-custom-datepicker"
          type="date"
          name="dueDate"
          selected={taskForm.dueDate}
          locale={enGB}
          onChange={(event) =>
            handleInputChange({ target: { name: "dueDate", value: event } })
          }
          timeInputLabel="Time:"
          dateFormat="dd/MM/yyyy h:mm a"
          showTimeInput
        />
        <div />
        <button
          className={formType === "edit" && "confirm-cancel-button"}
          onClick={(event) => {
            handleSubmit(event);
            formType === "edit" && closeEdit(false);
          }}
        >
          {formType === "edit" ? (
            <img
              className="confirm-cancel-icon"
              alt="check-icon"
              src={checkIcon}
            />
          ) : (
            "Create Task"
          )}
        </button>
        {formType === "edit" && (
          <button
            className="confirm-cancel-button"
            onClick={() => {
              closeEdit((prev) => {
                return !prev;
              });
            }}
          >
            <img
              className="confirm-cancel-icon"
              alt="check-icon"
              src={cancelIcon}
            />
          </button>
        )}
      </form>
    </div>
  );
}

export default TaskCreateForm;
