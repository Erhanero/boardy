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
    deleteDoc,
    getDocs,
    getDoc
} from 'firebase/firestore';
import { db } from '@/services/firebase';

const getListRef = (listId) => doc(db, 'lists', listId);
const getBoardRef = (boardId) => doc(db, 'boards', boardId);
const getListsQuery = (boardRef) => query(
    collection(db, 'lists'),
    where('boardId', '==', boardRef)
);

const listService = {
    /**
     * Get lists by board id.
     *
     * @param {String} boardId
     * @param {Function} onSuccess
     * @returns {Function}
     */
    getListsByBoardId(boardId, onSuccess) {
        const boardRef = getBoardRef(boardId);
        const listsQuery = getListsQuery(boardRef);

        return onSnapshot(listsQuery, (snapshot) => {
            const listsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            onSuccess(listsData);
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
        const boardRef = getBoardRef(boardId);
        const listsQuery = getListsQuery(boardRef);
        
        const listsSnapshot = await getDocs(listsQuery);
        
        const listData = {
            title: data.listTitle,
            boardId: boardRef,
            position: listsSnapshot.size
        };

        return addDoc(collection(db, 'lists'), listData);
    },

    /**
     * Update list.
     *
     * @param {Object} listData
     * @param {String} listId
     * @returns {Promise<void>}
     */
    async updateList(listData, listId) {
        const listRef = getListRef(listId);

        return updateDoc(listRef, listData);
    },

     /**
     * Delete list and all its cards.
     *
     * @param {String} listId
     * @returns {Promise<void>}
     */
      async deleteListAndAllItsCards(listId) {
          const listRef = getListRef(listId);
          const listSnapshot = await getDoc(listRef);
          const deletedListPosition = listSnapshot.data().position;
          const deletedListBoardId = listSnapshot.data().boardId;
        
        const cardsQuery = query(
            collection(db, 'cards'),
            where('listId', '==', listRef)
        );

        const cardsSnapshot = await getDocs(cardsQuery);
        await Promise.all(
            cardsSnapshot.docs.map(cardDoc => 
                deleteDoc(doc(db, 'cards', cardDoc.id))
            )
        );     

        await this.updateListsPositions(deletedListBoardId, deletedListPosition)
        
        return deleteDoc(listRef);
    },
      
      /**
       * Update lists positions.
       * 
       * @param {String} boardId 
       * @param {Number} deletedPosition 
       * @returns {Promise}
       */
    async updateListsPositions(boardId, deletedPosition) {
        const listsQuery = query(
            collection(db, 'lists'),
            where('boardId', '==', boardId),
            where('position', '>', deletedPosition)
        );
        
        const listsToUpdate = await getDocs(listsQuery);          
       return Promise.all(
            listsToUpdate.docs.map(listDoc => 
                updateDoc(doc(db, 'lists', listDoc.id), {
                    position: listDoc.data().position - 1
                })
            )
        );
    }
};

export default listService;
