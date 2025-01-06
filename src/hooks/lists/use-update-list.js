/**
 * External dependencies.
 */
import { useState } from 'react';

/**
 * Internal dependencies.
 */
import listService from '@/services/list-service';

const useUpdateList = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	/**
	 * Update list.
	 * 
	 * @param {Object} listData 
	 * @param {String} listId 
	 * @returns {Promise<Object|Boolean>}
	 */
	const updateList = async (listData, listId) => {
		try {
			setIsLoading(true);
			setError(null);			

			await listService.updateList(listData, listId);						

		} catch (error) {
			setError(error.message);
			return false;
			
		} finally {
			setIsLoading(false);
		}
	}

	return {
		updateList,
		isLoading,
		error
	}
}

export default useUpdateList;