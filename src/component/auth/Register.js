import { useState } from "react";
import styles from "./Auth.module.css";
import Input from "../../utils/common/Input";
import Button from "../../utils/common/Button";
import { useNavigate } from "react-router-dom";

export const Register = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(name, email, password);
    navigate("/");
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
          onValueChanged={(val) => setName(val)}
        />
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
