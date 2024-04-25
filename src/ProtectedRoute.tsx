import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "./constants";

interface IProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: IProps) => {
  const location = useLocation();
  if (!localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)) {
    return <Navigate to="/aboutus" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
