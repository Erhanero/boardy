/**
 * External dependencies.
 */
import { useState } from 'react';

/**
 * Internal dependencies.
 */
import cardService from '@/services/card-service';

const useUpdateCard = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	/**
	 * Update card.
	 * 
	 * @param {Object} cardData 
	 * @param {String} cardId 
	 * @returns {Promise<Object|Boolean>}
	 */
	const updateCard = async (cardData, cardId) => {
		try {
			setIsLoading(true);
			setError(null);			

			await cardService.updateCard(cardData, cardId);						

		} catch (error) {
			console.error(error.message);
			setError(error.message);
			return false;
			
		} finally {
			setIsLoading(false);
		}
	}

	return {
		updateCard,
		isLoading,
		error
	}
}

export default useUpdateCard;