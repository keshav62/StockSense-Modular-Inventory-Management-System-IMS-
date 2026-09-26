import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loading from '../common/Loading';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading type="page" />;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
