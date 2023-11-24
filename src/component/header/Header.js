import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import Circle from "../../utils/common/Circle";
import LOGO_IMAGE from "../../image/logo.jpg";
import { isLoggedIn } from "../../helper/Common";

export default function Header() {
  const [login, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const isUserLoggedin = await isLoggedIn();
      setLoggedIn(isUserLoggedin);
    }
    checkLogin();
  }, []);

  return (
    <header>
      <nav className={classes.mainNav}>
        <div className={classes.division}>
          <Circle className={classes.circle}>
            <img src={LOGO_IMAGE} alt="logo" className={classes.logo} />
          </Circle>
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            Dashboard
          </NavLink>
        </div>
        <div className={classes.division}>
          <NavLink
            to={"/analytics"}
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            Analytics
          </NavLink>
          <NavLink
            to={"/api"}
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            API
          </NavLink>
          <NavLink
            to={"/auth"}
            className={({ isActive }) => (isActive ? classes.active : "")}
            onClick={() => setLoggedIn(!login)}
          >
            {login ? "Login" : "Logout"}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
