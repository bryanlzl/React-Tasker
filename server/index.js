const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const taskRoutes = require("./routes/tasks");

app.use(cors());

app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
