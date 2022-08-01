import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../pages/login/Login';
import LoginVendor from '../pages/login/LoginVendor';
import Register from '../pages/register/Register';
import { login } from '../services/auth';
import { useAppSelector } from '../store/hooks';

const accessToken = localStorage.getItem('accessToken');
const accessTokenVendor = localStorage.getItem('accessTokenVendor');

export const authRoute = [
  {
    path: 'login',
    element: accessToken ? <Navigate to="/" replace /> : <Login />,
  },
  {
    path: 'login-vendor',
    element: accessTokenVendor ? <Navigate to="/" replace /> : <LoginVendor />,
  },
  {
    path: 'register',
    element: <Register />,
  },
];
