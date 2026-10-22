import React from "react";
import classes from "./DashboardHeading.module.css";
import { RiFlashlightLine } from "react-icons/ri";

export default function DashboardHeading() {
  return (
    <div className={classes.heading}>
      <div className={classes.content}>
        <div className={classes.badge}>
          <RiFlashlightLine size={14} />
          <span>Intelligent URL Management & Dynamic QR Engine</span>
        </div>
        <h1>
          Make every <span className={classes.special}>connection</span> count
        </h1>
        <p>
          Generate branded short links and high-res QR codes. Track visitor engagement in real time with high-precision metrics.
        </p>
      </div>
    </div>
  );
}
