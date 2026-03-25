import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  
  // FIX: Changed 'role' to 'userRole' to match Login.js
  const userRole = localStorage.getItem('userRole'); 

  // If we have no token, send back to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Role check
  if (requiredRole && userRole?.toLowerCase() !== requiredRole.toLowerCase()) {
    console.warn(`Access denied: Required ${requiredRole}, found ${userRole}`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;