import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MenuContent } from "../Contents/Menu_Contents";

const PrivateRoute = () => {
  const { accessToken } = useContext(MenuContent);
  return accessToken ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
