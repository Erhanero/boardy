/**
 * External dependencies.
 */
import { useEffect, useState, useCallback } from 'react';
import { doc,writeBatch} from 'firebase/firestore';
import { db } from '@/services/firebase';

/**
 * Internal dependencies.
 */
import { useAuth } from '@/contexts/auth';
import cardService from '@/services/card-service';

const useCards = (boardId) => {
    const [cards, setCards] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setIsLoading(false);
            return;
		}

        try {
            const unsubscribe = cardService.getCardsByBoardId(boardId, onSuccess);
            
            return () => unsubscribe?.();
        }
        catch(error) {
            onError(error);
        }

    }, [user]);

    /**
     * On success.
     *
     * @param {Object} cards
     * @returns {Void}
     */
    const onSuccess = (cards) => {
        cards.sort((a, b) => a.position - b.position);

        setCards(cards);
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
        setError(error.message);
        setIsLoading(false);
    };   

    /**
     * Updat card list id.
     * 
     * @param {String} cardId
     * @param {String} newListId
     * @returns {Void}
     */
    const updateCardListId = useCallback((cardId, newListId) => {
        const newListRef = doc(db, 'lists', newListId);

        setCards(prevCards => prevCards.map(card => {
            if (card.id === cardId) {
                return { ...card, listId: newListRef };
            }
            return card;
        }));
    }, []);

    /**
     * Reorder cards in list.
     * 
     * @param {Array} updatedCards
     * @returns {Void}
     */
    const reorderCardsInList = useCallback(async (updatedCards) => {        
        const prevCardsState = [...cards];
                
        setCards(prevCards => {
            return prevCards.map(card => {
                const updatedCard = updatedCards.find(uc => uc.id === card.id);

                if (updatedCard) {                    
                    return {
                        ...card,
                        position: updatedCards.indexOf(updatedCard)
                    };
                }
                
                return card;
            }).sort((a, b) => a.position - b.position);
        });             
        
        try {
            const batch = writeBatch(db);
        
            updatedCards.forEach((card, index) => {
                const cardRef = doc(db, 'cards', card.id);
                batch.update(cardRef, { position: index });
            });

            await batch.commit();
            
        } catch (error) {
            setPreviousCards(prevCardsState);
            console.error(error);
            throw error;
        }
    }, []);

    /**
     * Move card between lists
     * 
     * @param {Array} overCards 
     * @param {Object} params
     * @param {Object} params.activeCard
     * @param {Number} params.overCardIndex
     * @param {Object} params.overList
     * @returns {Void}     
     */
    const moveCardBetweenLists = useCallback(async (overCards, params) => {
        const { activeCard, overCardIndex, overList } = params;    
        const prevCardsState = [...cards];
        
        setCards(prevCards => {
            return prevCards.map(card => {
                if (card.id === activeCard.id) {
                    return {
                        ...card,
                        listId: doc(db, 'lists', overList.id),
                        position: overCardIndex
                    };
                }
                
                const isCardInTargetList = overCards.some(oc => oc.id === card.id);
                if (isCardInTargetList) {
                    const newPosition = overCards.findIndex(oc => oc.id === card.id);
                    return {
                        ...card,
                        position: newPosition
                    };
                }
                
                return card;
            }).sort((a, b) => a.position - b.position);
        });

        try {
            const batch = writeBatch(db);
            
            const cardRef = doc(db, 'cards', activeCard.id);
            const newListRef = doc(db, 'lists', overList.id);

            batch.update(cardRef, {
                listId: newListRef,
                position: overCardIndex
            }); 

            overCards.forEach((card, index) => {
                const cardRef = doc(db, 'cards', card.id);
                batch.update(cardRef, { position: index });
            });

            await batch.commit();

        } catch (error) {
            setCards(prevCardsState);
            console.error(error.message);
            throw error;
        }
    }, []);

    return {
        cards,
        isLoading,
        reorderCardsInList,
        moveCardBetweenLists,
        updateCardListId,
        error
    };
};

export default useCards;
