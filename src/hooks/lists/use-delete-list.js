/**
 * External dependencies.
 */
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

/**
 * Internal dependencies.
 */
import listService from '@/services/list-service';

const useDeleteList = () => {
    const deleteList = useCallback(async (listId) => {
        try {
            await listService.deleteListAndAllItsCards(listId);
            toast.success('List deleted successfully');

		} catch (error) {
            console.error(error.message);
            toast.error('Failed to delete list');
            throw error;
        }
    }, []);

    return { deleteList };
};

export default useDeleteList;