import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import Circle from "../../utils/common/Circle";
import LOGO_IMAGE from "../../image/logo.jpg";
import { getTokenFromLocalStorage, clearLocalStorage } from "../../helper/LocalStorage";
import { LOGOUT_API } from "../../config";

export default function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState(getTokenFromLocalStorage());

  useEffect(() => {
    setToken(getTokenFromLocalStorage());
  }, []);

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const currentToken = getTokenFromLocalStorage();
      if (currentToken) {
        await fetch(LOGOUT_API, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }).catch((err) => console.log("Logout notification err:", err));
      }
    } finally {
      clearLocalStorage();
      setToken("");
      navigate("/auth");
    }
  };

  return (
    <header>
      <nav className={classes.mainNav}>
        <div className={classes.division}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Circle className={classes.circle}>
              <img src={LOGO_IMAGE} alt="logo" className={classes.logo} />
            </Circle>
          </Link>
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

          {token ? (
            <button
              type="button"
              onClick={logoutHandler}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "1rem",
                color: "#dc2626",
                padding: "8px 12px",
                fontWeight: 500,
              }}
            >
              Logout
            </button>
          ) : (
            <NavLink
              to={"/auth"}
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
