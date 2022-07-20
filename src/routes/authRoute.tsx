import Login from '../pages/login/Login';
import LoginVendor from '../pages/login/LoginVendor';
import Register from '../pages/register/Register';

export const authRoute = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'login-vendor',
    element: <LoginVendor />,
  },
  {
    path: 'register',
    element: <Register />,
  },
];
