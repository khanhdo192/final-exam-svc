import React from 'react';
import ProtectedRoute from '../components/route/ProtectedRoute';
import { ROLES } from '../constants/enum';

const Home = React.lazy(() => import('../pages/home/Home'));
const Catalog = React.lazy(() => import('../pages/catalog/Catalog'));
const ProductDetail = React.lazy(() => import('../components/product/ProductDetail'));
const Cart = React.lazy(() => import('../pages/cart/Cart'));
const Order = React.lazy(() => import('../pages/order/Order'));
const Checkout = React.lazy(() => import('../pages/checkout/Checkout'));
const Profile = React.lazy(() => import('../pages/profile/Profile'));

export const mainRoute = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'catalog',
    element: <Catalog />,
  },
  {
    path: 'catalog/:productId',
    element: <ProductDetail />,
  },
  {
    element: <ProtectedRoute allowedRoles={[ROLES.USER, ROLES.VENDOR]} />,
    children: [
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'cart/:orderId',
        element: <Order />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '401',
    element: <p>No Authorization Found</p>,
  },
  {
    path: '*',
    element: <p>Page Not Found</p>,
  },
];
