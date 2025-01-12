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
    getDocs,
    getDoc
} from 'firebase/firestore';
import { db } from '@/services/firebase';

const getCardsQuery = (boardRef) =>
    query(collection(db, 'cards'), where('boardId', '==', boardRef));

const cardService = {
    /**
     * Get cards by board id.
     *
     * @param {String} boardId
     * @param {Function} onSuccess
     * @returns {Function}
     */
    getCardsByBoardId(boardId, onSuccess) {
        const boardRef = doc(db, 'boards', boardId);
        const cardsQuery = getCardsQuery(boardRef);
        
        return onSnapshot(cardsQuery, (snapshot) => {
            const cardsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            onSuccess(cardsData);
        });
    },
    /**
     * Get cards by list id.
     *
     * @param {String} listId
     * @param {Function} onSuccess
     * @returns {Function}
     */
    getCardsByListId(listId, onSuccess) {
        const listRef = doc(db, 'lists', listId);
        const cardsQuery = getCardsQuery(listRef);

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
        const cardsQuery = getCardsQuery(listRef);

        const cardsSnapshot = await getDocs(cardsQuery);

        const cardData = {
            ...data,
            boardId: boardRef,
            listId: listRef,
            position: cardsSnapshot.size,
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
     * 
     * @param {String} cardId
     * @returns {Promise<void>}
     */
    async deleteCardById(cardId) {
        const cardRef = doc(db, 'cards', cardId);
        const cardSnapshot = await getDoc(cardRef);
        const deletedCardListId = cardSnapshot.data().listId;
        const deletedCardPosition = cardSnapshot.data().position;

        await this.updateCardsPositions(deletedCardListId, deletedCardPosition);
        await deleteDoc(cardRef);
    },

    /**
     * Update cards positions.
     *
     * @param {String} boardId
     * @param {Number} deletedPosition
     * @returns {Promise}
     */
    async updateCardsPositions(listId, deletedPosition) {
        const cardsQuery = query(
            collection(db, 'cards'),
            where('listId', '==', listId),
            where('position', '>', deletedPosition)
        );

        const cardsToUpdate = await getDocs(cardsQuery);
        return Promise.all(
            cardsToUpdate.docs.map((cardDoc) =>
                updateDoc(doc(db, 'cards', cardDoc.id), {
                    position: cardDoc.data().position - 1,
                })
            )
        );
    },
};

export default cardService;
