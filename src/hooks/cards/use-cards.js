/**
 * External dependencies.
 */
import { useEffect, useState } from 'react';

/**
 * Internal dependencies.
 */
import { useAuth } from '@/contexts/auth';
import cardService from '@/services/card-service';

const useCards = (listId) => {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    const { user } = useAuth();

    /**
     * On success.
     *
     * @param {Object} cardsData
     * @returns {Void}
     */
    const onSuccess = (cardsData) => {
        setCards(cardsData);
        setIsLoading(false);
        setError(null);
    };

    /**
     * On error.
     *
     * @param {Object} error
     * @returns {Void}
     */
    const onError = (error) => {
        setError(error.message)
        setIsLoading(false);
    };

    useEffect(() => {
        if (!user) {
            setIsLoading(false);
            return;
		}

        try {
            const unsubscribe = cardService.getCardsByListId(listId, onSuccess, onError);
            return () => unsubscribe?.();

        } catch (error) {
            onError(error);
        }

    }, [user]);

    return {
        cards,
        isLoading,
        error
    };
};

export default useCards;
