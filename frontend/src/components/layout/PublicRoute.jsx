import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loading from '../common/Loading';

const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading type="page" />;
  }

  return isAuthenticated ? <Navigate to="/products" replace /> : <Outlet />;
};

export default PublicRoute;
