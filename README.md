## React-Tasker ![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)

A task manager (to-do list) build with Reactjs, Expressjs and PostgreSQL

<img src="./readme_assets/react-tasker-main.png" alt="chess sprites" width="80%">

### Features

- Each task has a task name, priority level, due date & time and completion status
- Create, edit, delete tasks
- Date & time selector uses react-datepicker
- Sort tasks by any field (ascending/descending)
- Save and discard changes made (save/load current task items in database table)

## Getting Started

<u>Prerequisites:</u>
<br/>1. Node.js - `v16.15.0`
<br/>2. PostgreSQL - `12.17`

<u>To setup PostgreSQL table:</u>
<br/>
Query to create empty task table

```
CREATE TABLE tasks (
  task_idx serial PRIMARY KEY,
  task_name character varying(255),
  task_priority character varying(8),
  due_date timestamp with time zone,
  is_completed boolean
);
```

## Installation

Apart from pre-requisites, install these dependencies starting from root folder:
<br/>
`cd client`
<br/>
`npm install`
<br/>
`cd ../server`
<br/>
`npm install`
<br/>
`cd ..`
<br/>
`npm install`

To run:
<br/>
`npm start`

## Motivations

This project was built to reinforce fundamental concepts of React and frontend development as well as introducing fundamental concepts of backend development such as Express.js, PostgreSQL and creating REST APIs.
