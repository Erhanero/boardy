/**
 * External dependencies.
 */
import { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, query, where } from 'firebase/firestore';
import { db } from '@/services/firebase';

const useLists = (boardId ) => {
    const [lists, setLists] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
        if (!boardId) return;

        setIsLoading(true);

		const boardRef = doc(db, 'boards', boardId);
		const listsQuery = query(
			collection(db, 'lists'),
			where('boardId', '==', boardRef),
		);

        const unsubscribe = onSnapshot(
            listsQuery,
            (snapshot) => {
                const listsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
				}));
				const sortedLists = listsData.sort((a, b) => a.position - b.position);
				
                setLists(sortedLists);
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, [boardId]);

    return {
        lists,
        isLoading,
    };
};

export default useLists;
