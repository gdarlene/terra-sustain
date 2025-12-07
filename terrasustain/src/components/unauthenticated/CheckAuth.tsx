import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null'); 
  return { user };
};

interface RequireAuthProps {
  allowedRoles: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  //Checking if user is logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has one of the allowed roles

  const hasPermission = user.roles?.some((role: string) => allowedRoles.includes(role));

  if (!hasPermission) {
    // Redirection to Unauthorized page if role is missing
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the protected page
  return <Outlet />;
};

export default RequireAuth;