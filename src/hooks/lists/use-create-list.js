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
	 * Create list.
	 *
	 * @param {Object} data
	 * @param {string} boardId
	 * @returns {Promise<void>}
	 */
	const createList = async (data, boardId) => {
		setIsLoading(true);
		setError(null);
		
		try {
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