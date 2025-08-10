// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Exemplo: verifica se existe um token no localStorage
  return !!localStorage.getItem('token');
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
