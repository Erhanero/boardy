/**
 * External dependencies.
 */
import { useEffect, useState, useCallback } from 'react';

/**
 * Internal dependencies.
 */
import { useAuth } from '@/contexts/auth';
import cardService from '@/services/card-service';
import useRequest from '@/hooks/common/use-request';

const useCards = (listId) => {
    const [cards, setCards] = useState([]);
    const { isLoading, error, handleSubscription } = useRequest();
    const { user } = useAuth();

    const subscriptionCallback = useCallback(() => {
        if (!user) {
            setCards([]);
            return;
        }
        return cardService.getCardsByListId(listId, (cardsData) => {
            setCards(cardsData);
        });
    }, [user, listId]);

    handleSubscription(subscriptionCallback, !!user && !!listId);

    return {
        cards,
        isLoading,
        error
    };
};

export default useCards;
