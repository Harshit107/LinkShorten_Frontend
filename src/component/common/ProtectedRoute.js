import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getTokenFromLocalStorage, clearLocalStorage } from "../../helper/LocalStorage";
import { isLoggedIn } from "../../helper/Common";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = getTokenFromLocalStorage();
  const [checking, setChecking] = useState(Boolean(token));
  const [authorized, setAuthorized] = useState(Boolean(token));

  useEffect(() => {
    let isMounted = true;

    if (!token) {
      setAuthorized(false);
      setChecking(false);
      return;
    }

    // Verify token validity against backend check endpoint
    isLoggedIn()
      .then((valid) => {
        if (!isMounted) return;
        if (!valid) {
          clearLocalStorage();
          setAuthorized(false);
        } else {
          setAuthorized(true);
        }
        setChecking(false);
      })
      .catch(() => {
        if (!isMounted) return;
        // On network error with existing token, allow offline/cached view rather than abruptly kicking out
        setAuthorized(true);
        setChecking(false);
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  if (!token) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (checking) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          color: "#94a3b8",
          fontSize: "14px",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            border: "2px solid rgba(14, 165, 233, 0.2)",
            borderTopColor: "#0ea5e9",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <span>Verifying session...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}
