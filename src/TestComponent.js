import styles from "./styles/App.module.css";

export const GetNameComp = (props) => {
  let { name, age, email } = props.content;
  let textColour = props.iStyle;
  return (
    <div className={styles[textColour]}>
      <h1>{name}</h1>
      <h2>{age}</h2>
      <h2>{email}</h2>
    </div>
  );
};
