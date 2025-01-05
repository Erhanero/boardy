/**
 * External dependencies.
 */
import { useState } from 'react';

/**
 * Internal dependencies.
 */
import authService from '@/services/auth-service';

export const useLogin = () => {
    const [authError, setAuthError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Sign in.
     * 
     * @param {Object} credentials
     * @returns {Promise<void>}
     */
    const signIn = async ({ email, password }) => {
        try {
            setIsLoading(true);
            setAuthError(null);
            
            await authService.login(email, password);
            return true;

        } catch (error) {
            console.error(error.message)
            setAuthError(error.message);
            return false;
            
        } finally {
            setIsLoading(false);
        }
    };

    return {
        signIn,
        authError,
        isLoading
    }
}