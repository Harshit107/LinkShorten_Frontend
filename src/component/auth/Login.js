import React, { useState } from "react";
import styles from "./Login.module.css";

export const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(email, password);
  };

  return (
    <div className={styles["form-container"]}>
      <h2>Login</h2>
      <form onSubmit={submitFormHandler} className={styles["login-form"]}>
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
        onClick={() => props.onFormSubmission("register")}
      >
        Don't have an account? Register here!
      </button>
    </div>
  );
};
