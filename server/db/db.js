const { Pool } = require("pg");

const pool = new Pool({
  user: "test_user_1",
  host: "localhost",
  database: "ToDoTaskDB",
  password: "password1",
  port: "5432",
});

module.exports = pool;
