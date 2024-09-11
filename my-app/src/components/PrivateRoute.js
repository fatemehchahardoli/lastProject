import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'universal-cookie'

const PrivateRoute = () => {
const cookies = new Cookies();
const user = cookies.get('user')

  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
  
};

export default PrivateRoute;