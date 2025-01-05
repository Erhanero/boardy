/**
 * External dependencies.
 */
import { useEffect, useState } from "react";

/**
 * Internal dependencies.
 */
import boardService from '@/services/board-service';

const useBoard = (boardId) => {
    const [board, setBoard] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * On success.
     *
     * @param {Object} boardData
     * @returns {Void}
     */
    const onSuccess = (boardData) => {
        setBoard(boardData);
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
            setIsLoading(false);
            return;
        }

        try {
            const unsubscribe = boardService.getBoardById(boardId, onSuccess, onError);
            return () => unsubscribe?.();
            
        } catch (error) {
            onError(error);
        }
    }, [boardId]);

    return {
        board,
        isLoading,
        error
    };
};

export default useBoard;
