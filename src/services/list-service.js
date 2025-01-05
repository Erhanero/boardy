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

const listService = {
    /**
     * Get lists by board id.
     *
     * @param {String} boardId
     * @param {Function} onSuccess
     * @returns {Function}
     */
    getListsByBoardId(boardId, onSuccess) {
        const boardRef = doc(db, 'boards', boardId);
        const listsQuery = query(
            collection(db, 'lists'),
            where('boardId', '==', boardRef)
        );

        return onSnapshot(listsQuery, (snapshot) => {
            const listsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            onSuccess(listsData.sort((a, b) => a.position - b.position));
        });
    },

    /**
     * Create list.
     *
     * @param {Object} data
     * @param {String} boardId
     * @returns {Promise}
     */
    async createList(data, boardId) {
        const boardRef = doc(db, 'boards', boardId);
        const listData = {
            title: data.listTitle,
            boardId: boardRef,
        };

        return await addDoc(collection(db, 'lists'), listData);
    },
    /**
     * Update list.
     *
     * @param {Object} listData
     * @param {String} listId
     * @returns {Promise<void>}
     */
    async updateList(listData, listId) {
        const listRef = doc(db, 'lists', listId);
        
        await updateDoc(listRef, listData);
    },
};

export default listService;
