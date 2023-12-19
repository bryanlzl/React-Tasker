import Task from "./task";
import TaskForm from "./taskCreateForm";
import "../styles/taskTracker/task.css";

function TaskList(props) {
  const taskChangeHandler = props.taskChangeHandler;
  const taskList = props.taskList;
  return (
    <div className="task-list">
      <div className="task-entry task-column-header">
        <div>Task</div>
        <div>Priority Level</div>
        <div>Due Date</div>
      </div>
      {Object.keys(taskList).map((x) => {
        return (
          <Task
            key={x}
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
