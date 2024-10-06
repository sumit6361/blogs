import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getAuthToken } from "./lib/utils";
import { useAuth } from "./useAuth";

export const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" replace />;
};
