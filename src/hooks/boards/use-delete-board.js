/**
 * External dependencies.
 */
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
/**
 * Internal dependencies.
*/
import boardService from '@/services/board-service';

const useDeleteBoard = () => {
    const navigate = useNavigate();

    const deleteBoard = useCallback(async (boardId) => {
        try {
            await boardService.deleteBoardAndAllItsListsAndCards(boardId);
            toast.success('Board deleted successfully');
			navigate('/boards');
			
		} catch (error) {
			console.error(error.message)            
            toast.error('Failed to delete board');
        }
    }, []);

    return { deleteBoard };
};

export default useDeleteBoard;