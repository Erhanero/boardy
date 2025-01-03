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
    };

	/**
	 * On error.
	 * 
	 * @param {Object} error 
	 * @returns {Void}
	 */
    const onError = (error) => {
        console.error(error);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!boardId) {
            setIsLoading(false);
            return;
        }

        const unsubscribe = boardService.getBoardById(boardId, onSuccess, onError);

        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [boardId]);

    return {
        board,
        isLoading,
    };
};

export default useBoard;
