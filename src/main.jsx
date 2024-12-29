// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './pages/CreateTrip.jsx';
import { CardHoverEffectDemo } from './pages/common/CardHoverEffectDemo.jsx';
import Service from './pages/common/Service.jsx';
import TripSummary from './pages/common/TripSummary.jsx';
import { SignupFormDemo} from './pages/SignupFormDemo.jsx'
import PrivateRoute from './pages/auth/PrivateRoute.jsx';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PublicRoute from './pages/auth/PublicRoute.jsx';
import Slider from './pages/Slider.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/sli',
    element: <Slider />,
  },
  {
    path: '/create-trip',
    element: <PrivateRoute element={<CreateTrip />} />,
  },
  {
    path: '/explore',
     element:<Service />,
  },
  {
    path: '/trip-summary',
    element: <PrivateRoute element={<TripSummary />} />,
  },
  {
    path: '/signup',
    element: <PublicRoute element={<SignupFormDemo />} />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='327408594207-af56loqd3onqtjjrmvkqhip1nnn6qsou.apps.googleusercontent.com'>
    <Toaster/>
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
