import React, { useState } from "react";
import styles from "./Auth.module.css";
import Input from "../../utils/common/Input";
import Button from "../../utils/common/Button";
import { useNavigate } from "react-router-dom";
import { USER_REGISTER } from "../../config";
import { useServer } from "../../hooks/useServer";
import { setTokenToLocalStorage } from "../../helper/LocalStorage";
import { RiAlertLine } from "react-icons/ri";

export const Register = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { handleAPICall, error, isLoading } = useServer();

  const handleUserRegister = async () => {
    if (!name || !email || !password) return;
    const body = {
      name: name.trim(),
      email: email.trim(),
      password,
    };
    const result = await handleAPICall(USER_REGISTER, "POST", body);
    if (result && result.token) {
      setTokenToLocalStorage(result.token);
      navigate("/dashboard");
    }
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    await handleUserRegister();
  };

  return (
    <div className={styles["form-container"]}>
      <h2 className={styles["form-title"]}>Create Account</h2>
      <p className={styles["form-subtitle"]}>
        Start shortening URLs, creating QR codes, and tracking visits for free
      </p>

      {error && (
        <div className={styles["alert-error"]}>
          <RiAlertLine size={18} style={{ flexShrink: 0 }} />
          <span>{error.message}</span>
        </div>
      )}

      <form onSubmit={submitFormHandler} className={styles["register-form"]}>
        <Input
          label={"Full Name"}
          id={"name"}
          placeholder={"Jane Doe"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          label={"Password (min. 6 characters)"}
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
            disabled: !name || !email || password.length < 6 || isLoading,
          }}
          name={isLoading ? "Creating Account..." : "Create Free Account"}
        >
          {isLoading ? "Creating Account..." : "Create Free Account"}
        </Button>
      </form>

      <p className={styles["toggle-prompt"]}>
        Already have an account?
        <button
          type="button"
          className={styles["toggle-link-btn"]}
          onClick={() => props.onFormSubmission("login")}
        >
          Sign in
        </button>
      </p>
    </div>
  );
};
