import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import classes from "./AuthIndex.module.css";
import LOGO_IMAGE from "../../image/logo.jpg";
import { RiArrowLeftLine, RiShieldCheckLine, RiFlashlightLine } from "react-icons/ri";

function AuthIndex() {
  const [toggleForm, setToggleForm] = useState("login");

  return (
    <div className={classes.authPage}>
      {/* Brand Header */}
      <div className={classes.brandBar}>
        <Link to="/" className={classes.brandLink}>
          <div className={classes.logoCircle}>
            <img src={LOGO_IMAGE} alt="TrimURL" className={classes.logoImg} />
          </div>
          <span className={classes.brandName}>TrimURL</span>
        </Link>
        <p className={classes.brandTagline}>
          Shorten links, generate QR codes, and track real-time engagement
        </p>
      </div>

      {/* Main Authentication Card */}
      <div className={classes.authCard}>
        {/* Tab Switcher Pills */}
        <div className={classes.tabPillContainer}>
          <button
            type="button"
            className={`${classes.tabButton} ${
              toggleForm === "login" ? classes.tabButtonActive : ""
            }`}
            onClick={() => setToggleForm("login")}
          >
            Log In
          </button>
          <button
            type="button"
            className={`${classes.tabButton} ${
              toggleForm === "register" ? classes.tabButtonActive : ""
            }`}
            onClick={() => setToggleForm("register")}
          >
            Create Account
          </button>
        </div>

        {/* Active Form */}
        {toggleForm === "login" ? (
          <Login onFormSubmission={(mode) => setToggleForm(mode)} />
        ) : (
          <Register onFormSubmission={(mode) => setToggleForm(mode)} />
        )}

        {/* Card Footer: Back link */}
        <div className={classes.cardFooter}>
          <Link to="/" className={classes.backHomeLink}>
            <RiArrowLeftLine size={16} /> Back to Homepage
          </Link>
        </div>
      </div>

      {/* Trust Badges */}
      <div className={classes.trustBadges}>
        <span className={classes.trustBadge}>
          <RiShieldCheckLine size={15} color="#10b981" /> 256-bit Encrypted
        </span>
        <span>•</span>
        <span className={classes.trustBadge}>
          <RiFlashlightLine size={15} color="#38bdf8" /> 100% Free Service
        </span>
      </div>
    </div>
  );
}

export default AuthIndex;
