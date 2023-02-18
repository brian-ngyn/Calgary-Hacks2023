import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserAuth } from "../authentication/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/landing" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
