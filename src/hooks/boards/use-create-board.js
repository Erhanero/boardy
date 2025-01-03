/**
 * External dependencies.
 */
import { useState } from 'react';

/**
 * Internal dependencies.
 */
import { useAuth } from '@/contexts/auth';
import boardService from '@/services/board-service';

const useCreateBoard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    /**
     * Create board.
     *
     * @param {Object} data
     * @returns {Promise<void>}
     */
    const createBoard = async (data) => {
        try {
            setIsLoading(true);
            setError(null);

			const newBoard = await boardService.createBoard(data, user.uid);
			return newBoard;

        } catch (error) {
			setError(error.message);
			return false;
			
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createBoard,
        isLoading,
        error
    };
};

export default useCreateBoard;