import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import LOGO_IMAGE from "../../image/logo.jpg";
import { getTokenFromLocalStorage, clearLocalStorage } from "../../helper/LocalStorage";
import { LOGOUT_API } from "../../config";
import {
  RiDashboardLine,
  RiBarChartBoxLine,
  RiCodeSSlashLine,
  RiLoginBoxLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";

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
    <header className={classes.header}>
      <nav className={classes.mainNav}>
        <div className={classes.brandGroup}>
          <Link to="/" className={classes.brandLink}>
            <div className={classes.logoCircle}>
              <img src={LOGO_IMAGE} alt="TrimURL Logo" className={classes.logoImg} />
            </div>
            <span className={classes.brandTitle}>
              TrimURL<span>.</span>
            </span>
          </Link>

          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              `${classes.navItem} ${isActive ? classes.active : ""}`
            }
          >
            <RiDashboardLine size={16} />
            <span>Dashboard</span>
          </NavLink>
        </div>

        <div className={classes.actionsGroup}>
          <div className={classes.navLinks}>
            <NavLink
              to={"/analytics"}
              className={({ isActive }) =>
                `${classes.navItem} ${isActive ? classes.active : ""}`
              }
            >
              <RiBarChartBoxLine size={16} />
              <span>Analytics</span>
            </NavLink>

            <NavLink
              to={"/api"}
              className={({ isActive }) =>
                `${classes.navItem} ${isActive ? classes.active : ""}`
              }
            >
              <RiCodeSSlashLine size={16} />
              <span>API</span>
            </NavLink>
          </div>

          {token ? (
            <button
              type="button"
              onClick={logoutHandler}
              className={classes.logoutBtn}
              title="Logout of session"
            >
              <RiLogoutBoxRLine size={15} />
              <span>Logout</span>
            </button>
          ) : (
            <NavLink to={"/auth"} className={classes.loginBtn}>
              <RiLoginBoxLine size={15} />
              <span>Sign In</span>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
