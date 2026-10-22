import React from "react";
import Header from "../component/header/Header";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#090e17",
        color: "#f8fafc",
      }}
    >
      <Header />
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Outlet />
      </main>
    </div>
  );
}
