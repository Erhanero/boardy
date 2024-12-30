/**
 * External dependencies.
 */
import { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, query, where } from 'firebase/firestore';
import { useAuth } from '@/contexts/auth';
import { db } from '@/firebase';

const useGetBoards = () => {
	const [boards, setBoards] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		if (!user) {
			setIsLoading(false);
			return;
		}

		const userRef = doc(db, 'users', user.uid);
		const boardsQuery = query(
			collection(db, 'boards'),
			where('owner', '==', userRef)
		);

		const unsubscribe = onSnapshot(boardsQuery, (snapshot) => {
			const boardsData = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));

			setBoards(boardsData);
			setIsLoading(false);
		});
	  
		return () => unsubscribe();
	}, [user]);	
	
	return {
		boards,
		isLoading
	}
}

export default useGetBoards;