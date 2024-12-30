/**
 * External dependencies.
 */
import { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, query, where } from 'firebase/firestore';
import { db } from '@/firebase';

const useGetBoard = (boardId) => {
	const [board, setBoard] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!boardId) {
			setIsLoading(false);
			return;
		}

        const boardRef = doc(db, 'boards', boardId);
        
        const unsubscribe = onSnapshot(boardRef, (doc) => {
            if (doc.exists()) {
                setBoard({
                    id: doc.id,
                    ...doc.data()
				});
				
				console.log(board)
            } else {
                setBoard(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [boardId]);
	
	return {
		board,
		isLoading
	}
}

export default useGetBoard;