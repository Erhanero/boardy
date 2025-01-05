/**
 * External dependencies.
 */
import { useState, useEffect } from 'react';

const useRequest = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Handle request.
     * 
     * @param {Function} request 
     * @returns {Promise<boolean>}
     */
    const handleRequest = async (request) => {
        try {
            setError(null);
            
            const result = await request();
            return result;
            
        } catch (error) {
            console.error(error.message);
            setError(error.message);
            return false;
            
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handle subscription.
     * 
     * @param {Function} subscriptionCallback 
     * @param {Boolean} enabled 
     */
    const handleSubscription = (subscriptionCallback, enabled = true) => {
        useEffect(() => {
            if (!enabled) {
                setIsLoading(false);
                return;
            }

            setError(null);

            try {
                const unsubscribe = subscriptionCallback();
                return () => unsubscribe?.();

            } catch (error) {
                console.error(error.message);
                setError(error.message);
                
            } finally {
                setIsLoading(false);
            }
        }, [enabled, subscriptionCallback]);
    };

    return {
        isLoading,
        error,
        handleRequest,
        handleSubscription
    };
};

export default useRequest;