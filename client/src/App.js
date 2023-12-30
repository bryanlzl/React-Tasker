import React, { useState } from "react";
import TaskTracker from "./components/TaskTracker/taskTracker";
import styles from "./styles/App.module.css";
import "./styles/font.css";

function App() {
  const [hidePractice, setHidePractice] = useState(true);

  return (
    <div className={styles.App}>
      <TaskTracker />
    </div>
  );
}

export default App;
