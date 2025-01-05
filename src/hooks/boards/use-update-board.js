/**
 * External dependencies.
 */
import { useState } from 'react';

/**
 * Internal dependencies.
 */
import boardService from '@/services/board-service';

const useUpdateBoard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Update board.
	 * 
     * @param {Object} boardData
     * @param {String} boardId
     * @returns {Promise<Object|Boolean>}
     */
    const updateBoard = async (boardData, boardId) => {
        try {
            setIsLoading(true);
            setError(null);

            const result = await boardService.updateBoard(boardData, boardId);
            return result
			
        } catch (error) {
			setError(error.message);
			return false;
			
        } finally {
            setIsLoading(false);
        }
    };

    return {
        updateBoard,
        isLoading,
        error,
    };
};

export default useUpdateBoard;
