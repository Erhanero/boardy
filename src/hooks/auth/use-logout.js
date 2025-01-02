/**
 * External dependencies.
 */
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import authService from '@/services/auth-service';

export const useLogout = () => {
	const navigate = useNavigate();
	
	 /**
     * Sign out.
     * 
     * @returns {Promise<void>}
     */
    const logout = async () => {
        
        try {
            await authService.logout();

            navigate('/login');
        } catch (error) {
            console.error(error.message);
        }
	 }
	
	return {
		logout
	}
}