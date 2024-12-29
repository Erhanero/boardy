/**
 * External dependencies.
 */
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import { useAuth } from '@/contexts/auth';

const ProtectedRoute = () => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
	  return <Navigate to="/login" replace />;
	}
  
	return <Outlet />;
}

export default ProtectedRoute;