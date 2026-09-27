import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

/**
 * GuestRoute — redirects authenticated users away from login/register pages
 */
const GuestRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/search" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
