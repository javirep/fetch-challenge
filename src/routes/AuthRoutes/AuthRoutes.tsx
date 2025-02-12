import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider.tsx";

const AuthRoutes = () => {
    const {authenticated} = useAuth();
  
    return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoutes;
  