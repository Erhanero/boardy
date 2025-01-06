/**
 * External dependencies.
 */
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

/**
 * Internal dependencies.
 */
import cardService from '@/services/card-service';

const useDeleteCard = () => {
    const deleteCard = useCallback(async (cardId) => {
        try {
            await cardService.deleteCardById(cardId);
			toast.success('Card deleted successfully!');
			
        } catch (error) {
            console.error(error.message);
            toast.error('Failed to delete card');
        }
    }, []);

    return { deleteCard };
};

export default useDeleteCard;