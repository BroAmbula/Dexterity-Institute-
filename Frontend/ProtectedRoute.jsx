import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requiredRole }) {
  // Retrieve token and user details stored during login
  const token = localStorage.getItem('token') || localStorage.getItem('dex_token');
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // 1. If not logged in, silently send to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. If a specific role is required, verify it case-insensitively
  if (requiredRole && user.role?.toLowerCase() !== requiredRole.toLowerCase()) {
    return <Navigate to="/login" replace />;
  }

  // 3. Authorized
  return children;
}