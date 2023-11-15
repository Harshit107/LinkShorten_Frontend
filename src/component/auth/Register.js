import { useState } from "react";
import styles from "./Register.module.css";

export const Register = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(email, password);
  };
  return (
    <div className={styles["form-container"]}>
      <h2>Register</h2>
      <form onSubmit={submitFormHandler} className={styles["register-form"]}>
        <label htmlFor="name">Your full name</label>
        <input
          type="name"
          placeholder="e.g. Some Name"
          id="name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <label htmlFor="email">Your email</label>
        <input
          type="email"
          placeholder="someone@example.com"
          id="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>

        <label htmlFor="password">Your password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="**********"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>

        <button type="submit">Log In</button>
      </form>
      <button
        className={styles["link-btn"]}
        onClick={() => props.onFormSubmission("login")}
      >
        Already have an account? Login here!
      </button>
    </div>
  );
};
