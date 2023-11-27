import { useState } from "react";
import styles from "./Auth.module.css";
import Input from "../../utils/common/Input";
import Button from "../../utils/common/Button";
import { useNavigate } from "react-router-dom";
import { USER_REGISTER } from "../../config";
import { useServer } from "../../hooks/useServer";
import { setTokenToLocalStorage } from "../../helper/LocalStorage";

export const Register = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const { handleAPICall } = useServer();

  const handleUserRegister = async () => {
    const body = { name, email, password };
    const data = await handleAPICall(USER_REGISTER, "POST", body);
    if (data) {
      setTokenToLocalStorage(data.token);
      navigate("/dashboard");
    }
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    console.log(event);
    await handleUserRegister();

    console.log(name, email, password);
    // navigate("/");
  };
  return (
    <div className={styles["form-container"]}>
      <h2>Register</h2>
      <form onSubmit={submitFormHandler} className={styles["register-form"]}>
        <Input
          label={"Your full name"}
          id={"name"}
          placeholder={"e.g. Some Name"}
          value={name}
          onChange={handleNameChange}
        />
        <Input
          label={"Your email"}
          id={"email"}
          placeholder={"someone@example.com"}
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          label={"Your password"}
          id={"password"}
          type={"password"}
          placeholder={"**********"}
          value={password}
          onChange={handlePasswordChange}
        />

        <Button
          type="submit"
          action={{ onClick: submitFormHandler }}
          name="Register"
        >
          Register
        </Button>
      </form>
      <p
        className={styles["link-btn"]}
        onClick={() => props.onFormSubmission("login")}
      >
        Already have an account? Login here!
      </p>
    </div>
  );
};
