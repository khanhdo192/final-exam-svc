import ProtectedRoute from '../components/route/ProtectedRoute';
import EditProduct from '../components/vendor/EditProduct';
import ManageCategory from '../components/vendor/ManageCategory';
import SearchProduct from '../components/vendor/SearchProduct';
import { ROLES } from '../constants/enum';
import Vendor from '../pages/vendor/Vendor';

export const vendorRoute = [
  {
    element: <ProtectedRoute allowedRoles={[ROLES.VENDOR]} />,
    children: [
      {
        path: 'vendor',
        element: <Vendor />,
      },
      {
        path: '/managecategory',
        element: <ManageCategory />,
      },
      {
        path: '/searchproduct',
        element: <SearchProduct />,
      },
      {
        path: '/editproduct',
        element: <EditProduct />,
      },
    ],
  },
];
