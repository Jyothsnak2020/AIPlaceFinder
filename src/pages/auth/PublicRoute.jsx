import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('user');
  return isAuthenticated ? <Navigate to="/" /> : element;
};

export default PublicRoute;
