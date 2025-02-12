import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider.tsx";

const NonAuthRoutes = () => {
    const {authenticated} = useAuth();
  
    return authenticated ?  <Navigate to="/fetch-challenge/" /> : <Outlet />;
  };
  
export default NonAuthRoutes;