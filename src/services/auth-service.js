/**
 * External dependencies.
 */
import {
    getAuth,
    createUserWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth';

/**
 * Internal dependencies.
 */
import { authErrorMessages } from '@/constants/auth-errors';

export const authService = {
    /**
     * Login.
     * 
     * @param {String} email 
     * @param {String} password 
     * @returns {Promise<void>}
     */
    async login(email, password) {
		const auth = getAuth();
		
        try {
            await signInWithEmailAndPassword(auth, email, password);
			await setPersistence(auth, browserSessionPersistence);
			
        } catch (error) {
            throw new Error(authErrorMessages[error.code]);
        }
    },

     /**
     * Register.
     * 
     * @param {String} email 
     * @param {String} password 
     * @returns {Promise<void>}
     */
    async register(email, password) {
		const auth = getAuth();
		
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await setPersistence(auth, browserSessionPersistence);
			await signInWithEmailAndPassword(auth, email, password);
			
        } catch (error) {
			throw new Error(authErrorMessages[error.code]);
        }
    },

    /**
     * Logout   
     * 
     * @returns {Promise<void>}
     */
    async logout() {
		const auth = getAuth();
		
        try {
			await signOut(auth);
			
		} catch (error) {
            throw new Error(error);
        }
    }
}; 

export default authService;