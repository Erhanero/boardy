/**
 * External dependencies.
 */
import { useEffect, useState } from 'react';
import { doc, writeBatch } from 'firebase/firestore';
import { db } from '@/services/firebase';

/**
 * Internal dependencies.
 */
import listService from '@/services/list-service';

const useLists = (boardId) => {
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!boardId) {
            return;
        }
        setIsLoading(true);

        try {
            const unsubscribe = listService.getListsByBoardId(
                boardId,
                onSuccess,
                onError
            );
            return () => unsubscribe?.();
        } catch (error) {
            onError(error);
        }
    }, [boardId]);

    /**
     * On success.
     *
     * @param {Object} lists
     * @returns {Void}
     */
    const onSuccess = (lists) => {
        lists.sort((a, b) => a.position - b.position);

        setLists(lists);
        setIsLoading(false);
        setError(null);
    };

    /**
     * On error.
     *
     * @param {Object} error
     * @returns {Void}
     */
    const onError = (error) => {
        console.error(error.message);
        setError(error.message);
        setIsLoading(false);
    };

    /**
     * Update list position.
     * 
     * @param {Array} activeId      
     * @returns {Void}
     */
    const updateListPosition = async (reorderedLists) => {
        const prevListsState = [...lists];    
        setLists(reorderedLists);
            
        try {
            const batch = writeBatch(db);
            
            reorderedLists.forEach((list, index) => {
                const listRef = doc(db, 'lists', list.id);
                batch.update(listRef, { position: index });
            });

            await batch.commit();

        } catch (error) {
            setLists(prevListsState);
            console.error(error.message);
        }
    };

    return {
        lists,
        updateListPosition,
        isLoading,
        error,
    };
};

export default useLists;
