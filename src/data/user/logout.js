/**
 * External dependencies.
 */
import { getAuth, signOut } from 'firebase/auth';
import {useNavigate } from 'react-router-dom';

export const useLogout = () => {
	const navigate = useNavigate();
	
	 /**
     * Sign out.
     * 
     * @returns {Promise<void>}
     */
	 const logout = async () => {
         const auth = getAuth();

        try {
            await signOut(auth);

			navigate('/login');
			
        } catch (error) {
            console.error('Logout Error: ', error);
        }
	 }
	
	return {
		logout
	}
}