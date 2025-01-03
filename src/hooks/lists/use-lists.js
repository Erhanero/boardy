/**
 * External dependencies.
 */
import { useEffect, useState } from 'react';

/**
 * Internal dependencies.
 */
import listService from '@/services/list-service';

const useLists = (boardId ) => {
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
      /**
     * On success.
     *
     * @param {Object} listsData
     * @returns {Void}
     */
      const onSuccess = (listsData) => {
        setLists(listsData);
        setIsLoading(false);
    };

    /**
     * On error.
     *
     * @param {Object} error
     * @returns {Void}
     */
    const onError = (error) => {
        console.error(error.message);
        setIsLoading(false);
    };

	useEffect(() => {
        if (!boardId) return;

        setIsLoading(true);

        const unsubscribe = listService.getListsByBoardId(boardId, onSuccess, onError);

        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [boardId]);

    return {
        lists,
        isLoading,
    };
};

export default useLists;
