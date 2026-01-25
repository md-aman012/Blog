import React from "react";
import { Children } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to="/admin/login" replace/>;
    //The 'replace' prop is a crucial piece of UX: it replaces the current
    // entry in the browser's history stack instead of pushing a new one.
    // This prevents the user from being able to click the "back" button
    // and re-access the protected route after being redirected.
    }
    return children;
};

export default ProtectedRoute;