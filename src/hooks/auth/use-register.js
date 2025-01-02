/**
 * External dependencies.
 */
import { useState } from "react";

/**
 * Internal dependencies.
 */
import authService from "@/services/auth-service";

export const useRegister = () => {
    const [authError, setAuthError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Sign up.
     *
     * @param {Object} credentials
     * @returns {Promise<void>}
     */
    const signUp = async ({ email, password }) => {
        try {
            setIsLoading(true);
            setAuthError("");

            await authService.register(email, password);
			return true;
			
        } catch (error) {
            setAuthError(error.message);
			return false;
			
        } finally {
            setIsLoading(false);
        }
    };

    return {
        signUp,
        authError,
        isLoading,
    };
};
