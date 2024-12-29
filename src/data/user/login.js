/**
 * External dependencies.
 */
import { useState } from 'react';
import {
    getAuth,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence
} from 'firebase/auth';

const authErrorMessages = {
    'auth/user-not-found': 'No user found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/invalid-email': 'Invalid email address',
	'auth/user-disabled': 'This account has been disabled',
	'auth/invalid-credential': 'The provided credentials are invalid. Please check the email and password.',
};

export const useLogin = () => {
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Sign in.
     * 
     * @param {Object} credentials
     * @returns {Promise<void>}
     */
    const signIn = async ({ email, password }) => {
		const auth = getAuth();

        try {
            setIsLoading(true);
            setAuthError('');

            await signInWithEmailAndPassword(auth, email, password);
            await setPersistence(auth, browserSessionPersistence);

            return true;

		} catch (error) {
            setAuthError(authErrorMessages[error.code] || 'An error occurred during sign in');
            return false;

        } finally {
            setIsLoading(false);
        }
    }

    return {
        signIn,
        authError,
        isLoading
    }
}