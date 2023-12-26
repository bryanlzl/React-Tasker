const express = require("express");
const router = express.Router();
const pool = require("../db/db");

router.get("/", async (req, res) => {
  try {
    const rawTaskTable = await pool.query(`SELECT * FROM tasks`);
    res.json(rawTaskTable.rows);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

module.exports = router;

/*const taskList = {
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
};*/
