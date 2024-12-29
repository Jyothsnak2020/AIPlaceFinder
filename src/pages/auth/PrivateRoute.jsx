// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auths';
const PrivateRoute = ({ element }) => {
  return !isAuthenticated() ? element : <Navigate to="/" />;
};
export default PrivateRoute;