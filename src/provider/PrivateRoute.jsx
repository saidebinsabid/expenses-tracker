import React from "react";
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) return <Navigate to="/auth/login" replace />;

  return children;
};

export default PrivateRoute;
