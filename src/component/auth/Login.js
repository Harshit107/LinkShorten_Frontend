import React, { useState } from "react";
import styles from "./Auth.module.css";
import Input from "../../utils/common/Input";
import Button from "../../utils/common/Button";
import { useNavigate } from "react-router-dom";
import { useServer } from "../../hooks/useServer";
import { USER_AUTH } from "../../config";
import { setTokenToLocalStorage } from "../../helper/LocalStorage";
import { RiAlertLine } from "react-icons/ri";

export const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleAPICall, error, isLoading } = useServer();

  const handleUserLoginAuth = async () => {
    if (!email || !password) return;
    const body = { email: email.trim(), password };
    const result = await handleAPICall(USER_AUTH, "POST", body);

    if (result && result.token) {
      setTokenToLocalStorage(result.token);
      navigate("/dashboard");
    }
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    handleUserLoginAuth();
  };

  return (
    <div className={styles["form-container"]}>
      <h2 className={styles["form-title"]}>Welcome Back</h2>
      <p className={styles["form-subtitle"]}>
        Log in to access your shortened links, custom aliases, and analytics
      </p>

      {error && (
        <div className={styles["alert-error"]}>
          <RiAlertLine size={18} style={{ flexShrink: 0 }} />
          <span>{error.message}</span>
        </div>
      )}

      <form className={styles["login-form"]} onSubmit={submitFormHandler}>
        <Input
          label={"Email Address"}
          id={"email"}
          type={"email"}
          placeholder={"you@example.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label={"Password"}
          id={"password"}
          type={"password"}
          placeholder={"••••••••"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          className={styles["submit-btn"]}
          action={{
            onClick: submitFormHandler,
            disabled: !email || !password || isLoading,
          }}
          name={isLoading ? "Signing in..." : "Sign In to Dashboard"}
        >
          {isLoading ? "Signing in..." : "Sign In to Dashboard"}
        </Button>
      </form>

      <p className={styles["toggle-prompt"]}>
        Don't have an account yet?
        <button
          type="button"
          className={styles["toggle-link-btn"]}
          onClick={() => props.onFormSubmission("register")}
        >
          Create account
        </button>
      </p>
    </div>
  );
};
