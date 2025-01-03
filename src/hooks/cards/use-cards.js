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
    };

    /**
     * On error.
     *
     * @param {Object} error
     * @returns {Void}
     */
    const onError = (error) => {
        console.error(error.message);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!user) {
            setIsLoading(false);
            return;
		}

		const unsubscribe = cardService.getCardsByListId(listId, onSuccess, onError);

		return () => {
			if (typeof unsubscribe === 'function') {
				unsubscribe();
			}
		};
    }, [user]);

    return {
        cards,
        isLoading,
    };
};

export default useCards;
