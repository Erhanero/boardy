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
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '@/services/firebase';

const cardService = {
    /**
     * Get cards by list id.
     *
     * @param {String} boardId
     * @param {Function} onSuccess
     * @returns {Function}
     */
    getCardsByListId(listId, onSuccess) {
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
    },

    /**
     * Create card.
     * @param {Object} data
     * @param {String} boardId
     * @param {String} listId
     * @returns {Promise}
     */
    async createCard(data, boardId, listId) {
        const boardRef = doc(db, 'boards', boardId);
        const listRef = doc(db, 'lists', listId);

        const cardData = {
            ...data,
            boardId: boardRef,
            listId: listRef,
        };

        return await addDoc(collection(db, 'cards'), cardData);
    },

    /**
     * Update card.
     * @param {Object} cardData
     * @param {String} cardId
     * @returns {Promise<void>}
     */
    async updateCard(cardData, cardId) {
        const cardRef = doc(db, 'cards', cardId);
        await updateDoc(cardRef, cardData);
    },

    /**
     * Delete card by id.
     * @param {String} cardId
     * @returns {Promise<void>}
     */
      async deleteCardById(cardId) {
        const cardRef = doc(db, 'cards', cardId);
        await deleteDoc(cardRef);
    },
};

export default cardService;
