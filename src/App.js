import styles from "./styles/App.module.css";
import { GetNameComp } from "./TestComponent";
import React, { useState } from "react";
import TaskTracker from "./components/taskTracker";
import "./styles/font.css";

function App() {
  const userStats1 = {
    name: "Bryan",
    age: 21,
    email: "me@aol.com",
  };
  const userStats2 = {
    name: "Ryan",
    age: 23,
    email: "lala@aol.com",
  };
  const userStats3 = {
    name: "Gryan",
    age: 17,
    email: "gege@aol.com",
  };

  const [userDB, setUserDB] = useState({
    0: userStats1,
    1: userStats2,
    2: userStats3,
  });

  const [userStat, setUserStats] = useState(0);

  const [renderScreen, setRenderScreen] = useState(false);

  const [testString, setTestString] = useState("");

  const colourEval = (userIdx) => {
    switch (String(userIdx)) {
      case "0":
        return "blue-text";
      case "1":
        return "red-text";
      case "2":
        return "green-text";
      default:
        return "default-text";
    }
  };

  const increaseAge = () => {
    setUserDB((prev) => ({
      ...prev,
      [userStat]: { ...prev[userStat], age: prev[userStat].age++ },
    }));
    setRenderScreen(!renderScreen ? true : false);
  };

  const pickUserRandom = () => {
    let randomIdx = Math.floor(Math.random() * 3);
    setUserStats(randomIdx);
  };

  return (
    <div className={styles.App}>
      <div className={styles["random-selector"]}>
        <span>
          <button onClick={pickUserRandom}>Pick random user</button>
          <button onClick={increaseAge}>+1 age</button>
        </span>
        <GetNameComp content={userDB[userStat]} iStyle={colourEval(userStat)} />
      </div>
      <div className={styles["name-list"]}>
        <h2>user Database where (age >= 20):</h2>
        {Object.keys(userDB).map((x) => {
          if (userDB[x].age >= 20) {
            return (
              <GetNameComp key={x} content={userDB[x]} iStyle={colourEval(x)} />
            );
          }
        })}
      </div>
      <div className={styles["secret-password-module"]}>
        <h2>Secret password input ('secret_password'):</h2>
        <input
          onChange={(x) => {
            setTestString(x.target.value);
          }}
        ></input>
        {testString === "secret_password" && <p>Password is correct</p>}
      </div>

      <TaskTracker />
    </div>
  );
}

export default App;
