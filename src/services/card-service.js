/**
 * External dependencies.
 */
import {
    collection,
    doc,
    query,
    where,
    onSnapshot,
    addDoc,
    updateDoc
} from 'firebase/firestore';
import { db } from '@/services/firebase';

const cardService = {
    /**
     * Get cards by list id.
     *
     * @param {String} boardId
     * @param {Function} onSuccess
     * @param {Function} onError
     * @returns {Function}
     */
    getCardsByListId(listId, onSuccess, onError) {
        try {
            const listRef = doc(db, 'lists', listId);
            const cardsQuery = query(
                collection(db, 'cards'),
                where('listId', '==', listRef)
            );

            return onSnapshot(cardsQuery, (snapshot) => {
                const cardsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                onSuccess(cardsData);
            });
        } catch (error) {
            onError?.(error);
        }
	},

    /**
     * Create card.
     * @param {Object} data 
     * @param {String} boardId 
     * @param {String} listId 
     * @returns {Promise}
     */
	async createCard(data, boardId, listId) {
		try {
			const boardRef = doc(db, 'boards', boardId);
            const listRef = doc(db, 'lists', listId);
            
			const cardData = {
				...data,
				boardId: boardRef,
				listId: listRef,
            };

			return await addDoc(collection(db, 'cards'), cardData);

        } catch (error) {
            throw new Error(error);        
		}
    },
    
     /**
     * Update card.
     * @param {Object} cardData 
     * @param {String} cardId 
     * @returns {Promise<void>}
     */
    async updateCard(cardData, cardId) {
        try {
            const cardRef = doc(db, 'cards', cardId);
            await updateDoc(cardRef, cardData);            

        } catch (error) {
            throw new Error(error);
        }
    }
};

export default cardService;
