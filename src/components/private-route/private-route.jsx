/**
 * External dependencies.
 */
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import { useAuth } from '@/contexts/auth';

const PrivateRoute = () => {
	const { isAuthenticated } = useAuth()

	if (!isAuthenticated) {
	  return <Navigate to="/login" replace />;
	}
  
	return <Outlet />;
}

export default PrivateRoute;