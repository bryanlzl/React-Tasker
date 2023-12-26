const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const taskRoutes = require("./routes/tasks");

app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
