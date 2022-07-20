import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';
import { useAppSelector } from '../../store/hooks';

type Roles = {
  allowedRoles: string[];
};

const ProtectedRoute = ({ allowedRoles }: Roles) => {
  const location = useLocation();
  const isLogged = useAppSelector(state => state.auth.login?.isLogged);
  const auth = useCurrentUser();

  if (auth?.Role) {
    return allowedRoles.includes(auth?.Role) ? (
      <Outlet />
    ) : isLogged ? (
      <Navigate to="/login-vendor" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }
  return isLogged ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
