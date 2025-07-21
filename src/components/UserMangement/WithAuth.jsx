// src/components/WithAuth.js
import React from "react";
import { Navigate } from "react-router-dom";

const withAuth = (Component, requiredRole = null) => {
  return (props) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
