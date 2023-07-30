import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, userInfo } from "../router/auth";

const AdminRoute = ({ children }) => {
  const auth = isAuthenticated();

  return auth && userInfo().role === "admin" ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
