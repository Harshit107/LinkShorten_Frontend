import React, { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import classes from "./Index.module.css";

function Index() {
  const [toggleForm, setToggleForm] = useState("login");
  return (
    <div className={classes.App}>
      {toggleForm === "login" ? (
        <Login onFormSubmission={(setting) => setToggleForm(setting)} />
      ) : (
        <Register onFormSubmission={(setting) => setToggleForm(setting)} />
      )}
    </div>
  );
}

export default Index;
