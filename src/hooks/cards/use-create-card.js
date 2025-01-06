/**
 * External dependencies.
 */
import { useState } from 'react';

/**
 * Internal dependencies.
 */
import cardService from '@/services/card-service';

const useCreateCard = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	/**
	 * Create card.
	 *
	 * @param {Object} data
	 * @param {string} boardId
	 * @param {string} listId
	 * @returns {Promise<void>}
	 */
	const createCard = async (data, boardId, listId) => {
		setIsLoading(true);
		setError(null);
		
		try {
			const card = await cardService.createCard(data, boardId, listId);
			return card;

		} catch (error) {
			console.error(error.message);
			setError(error.message);
			return false;
			
		} finally {
			setIsLoading(false);
		}
	};

	return {
		createCard,
		isLoading,
		error
	};
};

export default useCreateCard;