/**
 * External dependencies.
 */
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';

/**
 * Internal dependencies.
 */
import boardService from '@/services/board-service';

const useBoards = () => {
    const [boards, setBoards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    /**
     * On success.
     *
     * @param {Object} boardsData
     * @returns {Void}
     */
    const onSuccess = (boardsData) => {
        setBoards(boardsData);
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
        if (!user) {
            setIsLoading(false);
            return;
        }

        try {
            const unsubscribe = boardService.getBoardsByUserId(user.uid, onSuccess, onError);
            return () => unsubscribe?.();
            
        } catch (error) {
            onError(error);
        }
    }, [user]);

    return {
        boards,
        isLoading,
        error
    };
};

export default useBoards;
