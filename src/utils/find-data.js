/**
 * External dependencies.
 */
import { doc } from 'firebase/firestore';

/**
 * Internal dependencies.
 */
import { db } from '@/services/firebase';

/**
 * Get cards by list id.
 *
 * @param {param} listId
 * @returns {Array}
 */
export const findCardsByListId = (cards, listId) => {
    const listRef = doc(db, 'lists', listId);
    return cards.filter((card) => card.listId.path === listRef.path);
};

/**
     * Find list by id.
     * 
     * @param {String} id 
     * @returns {Object}
     */
export const findListById = (lists, id) => {
    return lists.find(list => list.id === id);
};