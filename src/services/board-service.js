/**
 * External dependencies.
 */
import {
    collection,
    doc,
    query,
    where,
    onSnapshot,
    updateDoc,
    addDoc,
} from 'firebase/firestore';
import { db } from '@/services/firebase';

const boardService = {
    /**
     * Get boards by user id.
     *
     * @param {String} userId
     * @param {Function} onSuccess
     * @returns {Function}
     */
    getBoardsByUserId(userId, onSuccess) {
        const userRef = doc(db, 'users', userId);
        const boardsQuery = query(
            collection(db, 'boards'),
            where('owner', '==', userRef)
        );

        return onSnapshot(boardsQuery, (snapshot) => {
            const boardsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            onSuccess(boardsData);
        });
    },

    /**
     * Get board by id.
     *
     * @param {String} boardId
     * @param {Function} onSuccess
     * @returns {Function}
     */
    getBoardById(boardId, onSuccess) {
        const boardRef = doc(db, 'boards', boardId);
        
        return onSnapshot(boardRef, (doc) => {
            if (doc.exists()) {
                onSuccess({
                    id: doc.id,
                    ...doc.data(),
                });
            } else {
                onSuccess(null);
            }
        });
    },

    /**
     * Create board.
     *
     * @param {Object} data
     * @param {String} userId
     * @returns {Promise}
     */
    async createBoard(data, userId) {
        const userRef = doc(db, 'users', userId);
        const boardData = {
            title: data.boardName,
            owner: userRef,
        };

        return await addDoc(collection(db, 'boards'), boardData);
    },

    /**
     * Update board.
     *
     * @param {Object} boardData
     * @param {String} userId
     * @returns {Promise}
     */
    async updateBoard(boardData, boardId) {
        const boardRef = doc(db, 'boards', boardId);

        return await updateDoc(boardRef, boardData);
    },
};

export default boardService;
