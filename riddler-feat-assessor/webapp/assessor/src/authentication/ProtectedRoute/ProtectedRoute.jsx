import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const select = useSelector((state) => state.selection.hasSelected);
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!select) {
    return <Navigate to="/selection" />;
  }

  return children;
};

export default ProtectedRoute;
