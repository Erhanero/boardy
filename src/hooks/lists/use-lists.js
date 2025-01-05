/**
 * External dependencies.
 */
import { useEffect, useState } from 'react';

/**
 * Internal dependencies.
 */
import listService from '@/services/list-service';

const useLists = (boardId) => {
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * On success.
     *
     * @param {Object} listsData
     * @returns {Void}
     */
    const onSuccess = (listsData) => {
        setLists(listsData);
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
        setError(error.message);
        setIsLoading(false);
    };

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

    return {
        lists,
        isLoading,
        error
    };
};

export default useLists;
