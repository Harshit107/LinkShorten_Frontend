import React, { useState } from "react";
import styles from "./Auth.module.css";
import Input from "../../utils/common/Input";

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
        <Input
          label={"Your email"}
          id={"email"}
          placeholder={"someone@example.com"}
          value={email}
          onValueChanged={(val) => setEmail(val)}
        />
        <Input
          label={"Your password"}
          id={"password"}
          placeholder={"**********"}
          value={password}
          onValueChanged={(val) => setPassword(val)}
        />

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
