import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if(loading === false && isAuthenticated === true) {
    return <Outlet/>
  }
  if(loading === false && isAuthenticated === true && isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" />
  }
  
};

export default ProtectedRoute;