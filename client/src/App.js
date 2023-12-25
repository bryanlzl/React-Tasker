import React, { useState } from "react";
import { TestComponent } from "./components/TestComponent/TestComponent";
import TaskTracker from "./components/TaskTracker/taskTracker";
import styles from "./styles/App.module.css";
import "./styles/font.css";

function App() {
  const [hidePractice, setHidePractice] = useState(true);

  return (
    <div className={styles.App}>
      <button onClick={() => setHidePractice(!hidePractice)}>
        {hidePractice ? "Show Practice" : "Hide Practice"}
      </button>
      {!hidePractice && <TestComponent />}
      <TaskTracker />
    </div>
  );
}

export default App;
