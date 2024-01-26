import React, { useState } from "react";
import styles from "./Auth.module.css";
import Input from "../../utils/common/Input";
import Button from "../../utils/common/Button";
import { useNavigate } from "react-router-dom";
import { useServer } from "../../hooks/useServer";
import { USER_AUTH } from "../../config";
import { setTokenToLocalStorage } from "../../helper/LocalStorage";

export const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleAPICall } = useServer();

  const handleUserLoginAuth = async () => {
    const body = { email, password };
    const data = await handleAPICall(USER_AUTH, "POST", body);
    if (data) {
      
      setTokenToLocalStorage(data.token);
      navigate("/dashboard");
    }
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(email, password);
    handleUserLoginAuth();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles["form-container"]}>
      <h2>Login</h2>
      <form className={styles["login-form"]}>
        <Input
          label={"Your email"}
          id={"email"}
          placeholder={"someone@example.com"}
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          label={"Your password"}
          type={"password"}
          placeholder={"**********"}
          value={password}
          onChange={handlePasswordChange}
        />

        <Button
          type="submit"
          action={{ onClick: submitFormHandler }}
          name="Login"
        >
          Log In
        </Button>
      </form>
      <p
        className={styles["link-btn"]}
        onClick={() => props.onFormSubmission("register")}
      >
        Don't have an account? Register here!
      </p>
    </div>
  );
};
