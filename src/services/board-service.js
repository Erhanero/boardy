/**
 * External dependencies.
 */
import {
    collection,
    doc,
    query,
    where,
    onSnapshot,
    addDoc
} from 'firebase/firestore';
import { db } from '@/services/firebase';

const boardService = {
    /**
     * Get boards by user id.
     *
     * @param {String} userId
     * @param {Function} onSuccess
     * @param {Function} onError
     * @returns {Function}
     */
    getBoardsByUserId(userId, onSuccess, onError) {
        try {
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
        } catch (error) {
            onError?.(error);
        }
    },

    /**
     * Get board by id.
     *
     * @param {String} boardId
     * @param {Function} onSuccess
     * @param {Function} onError
     * @returns {Function}
     */
    getBoardById(boardId, onSuccess, onError) {
        try {
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
        } catch (error) {
            onError?.(error);
        }
    },

    /**
     * Create board.
     *
     * @param {Object} data
     * @param {String} userId
     * @returns {Promise}
     */
    async createBoard(data, userId) {
        try {
            const userRef = doc(db, 'users', userId);
            const boardData = {
                title: data.boardTitle,
                owner: userRef,
            };

            return await addDoc(collection(db, 'boards'), boardData);
        } catch (error) {
            throw error;
        }
    },

};

export default boardService;
