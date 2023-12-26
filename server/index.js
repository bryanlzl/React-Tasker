const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());

const tempDueDate = new Date();

app.get("/", (req, res) => {
  res.send("Welcome to CANADA");
});

app.get("/api/tasks", (req, res) => {
  const taskList = {
    0: {
      taskName: "Make bed",
      taskPriority: "Low",
      dueDate: new Date(tempDueDate.getTime() + 1231286400000),
      isCompleted: false,
    },
    1: {
      taskName: "Breakfast",
      taskPriority: "High",
      dueDate: new Date(tempDueDate.getTime() + 12382122460),
      isCompleted: false,
    },
    2: {
      taskName: "Popcorn",
      taskPriority: "Medium",
      dueDate: new Date(tempDueDate.getTime() + 8645500),
      isCompleted: false,
    },
    3: {
      taskName: "Watch movie",
      taskPriority: "Low",
      dueDate: new Date(tempDueDate.getTime() + 81201233123),
      isCompleted: false,
    },
  };

  res.status(200).json(taskList);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
