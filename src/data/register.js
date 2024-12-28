/**
 * External dependencies.
 */
import { useState } from 'react';
import {
	getAuth,
	createUserWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	signInWithEmailAndPassword
} from 'firebase/auth';

const authErrorMessages = {
	'auth/email-already-in-use': 'This email is already registered',
	'auth/invalid-email': 'Invalid email address',
	'auth/operation-not-allowed': 'Email/password accounts are not enabled',
	'auth/weak-password': 'Password is too weak'
  };

export const useRegister = () => {
	const [authError, setAuthError] = useState('');
	const [isLoading, setIsLoading] = useState(false);	

	/**
	 * Sign up.
	 * 
	 * @param {Object} credentials
	 * @returns {Promise<void>}
	 */
	const signUp = async ({email, password}) => {
		const auth = getAuth();

		try {
			setIsLoading(true);
			setAuthError('');
			
			await createUserWithEmailAndPassword(auth, email, password);
			await setPersistence(auth, browserSessionPersistence);
			await signInWithEmailAndPassword(auth, email, password);
			
			return true;

		} catch (error) {
			setAuthError(authErrorMessages[error.code] || 'An error occured during sign up');			
			return false;

		} finally {
			setIsLoading(false);
		}
	}

	return {
		signUp,
		authError,
		isLoading
	}
}