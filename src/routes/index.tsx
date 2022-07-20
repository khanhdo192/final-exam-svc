import { useRoutes } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import MainLayout from '../components/layout/MainLayout';
import VendorLayout from '../components/layout/VendorLayout';
import { authRoute } from './authRoute';
import { mainRoute } from './mainRoute';
import { vendorRoute } from './vendorRoute';

export const routeConfig = [
  {
    element: <MainLayout />,
    children: mainRoute,
  },
  {
    element: <AuthLayout />,
    children: authRoute,
  },
  {
    element: <VendorLayout />,
    children: vendorRoute,
  },
];

const RouterManager = () => {
  return useRoutes(routeConfig);
};

export default RouterManager;
