import { collection, doc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase';

const boardService = {
	/**
	 * Get boards.
	 * 
	 * @param {String} userId 
	 * @param {Function} onSuccess 
	 * @param {Function} onError
	 * @returns {Function}
	 */
	getBoards(userId, onSuccess, onError) {        
		try {
			const userRef = doc(db, 'users', userId);
			const boardsQuery = query(
				collection(db, 'boards'),
				where('owner', '==', userRef)
			);

			return onSnapshot(boardsQuery, (snapshot) => {
				const boardsData = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
				}));
				onSuccess(boardsData);
			});

		} catch (error) {
			if (onError) {
				onError(error);
			}
		}               
    },

    getBoardById(boardId, onSuccess, onError) {
        try {
            const boardRef = doc(db, 'boards', boardId);
            return onSnapshot(boardRef, (doc) => {
                if (doc.exists()) {
                    onSuccess({
                        id: doc.id,
                        ...doc.data()
                    })
                } else {
                    onSuccess(null);
                }
            });
        } catch (error) {
            if (onError) {
                onError(error);
            }
        }
    },

    getLists(boardId, callback) {
        const boardRef = doc(db, 'boards', boardId);
        const listsQuery = query(
            collection(db, 'lists'),
            where('boardId', '==', boardRef),
            orderBy('position')
        );

        return onSnapshot(listsQuery, (snapshot) => {
            const listsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(listsData);
        });
    }
};

export default boardService;