/**
 * External dependencies.
 */
import { useState } from 'react';

/**
 * Internal dependencies.
 */
import listService from '@/services/list-service';

const useCreateList = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	/**
	 * Create board.
	 *
	 * @param {Object} data
	 * @returns {Promise<void>}
	 */
	const createList = async (data, boardId) => {
		try {
			setIsLoading(true);
			setError(null);

			const list = await listService.createList(data, boardId);
			return list;

		} catch (error) {
			console.error(error.message);
			setError(error.message);
			return false;
			
		} finally {
			setIsLoading(false);
		}
	};

	return {
		createList,
		isLoading,
		error
	};
};

export default useCreateList;