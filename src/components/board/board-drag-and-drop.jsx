/**
 * External dependencies.
 */
import
React,
{
	useState,
	useRef,
	useCallback,
	useEffect,
} from 'react';
import {
	DndContext,
	DragOverlay,
	useSensors,
	useSensor,
	PointerSensor,
	pointerWithin,
	closestCenter,
	MeasuringStrategy,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { doc } from 'firebase/firestore';
import { db } from '@/services/firebase';

/**
 * Internal dependencies.
*/
import ListBoard from '@/components/list-board/list-board';
import Card from '@/components/card/card';
import { findCardsByListId, findListById } from '@/utils/find-data';

const BoardDragAndDrop = ({
	boardId,
	lists,
	cards: initialCards,
	updateListPosition,
	reorderCardsInList,
	moveCardBetweenLists,
	children
}) => {
	const [draggingList, setDraggingList] = useState(null);
	const [draggingCard, setDraggingCard] = useState(null);
	const [localCards, setLocalCards] = useState(initialCards);
	const originalListIdRef = useRef(null);

	useEffect(() => {
		setLocalCards(initialCards);
	}, [initialCards]);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 3,
			}
		})
	);

	/**
	* On drag start.
	* 
	* @param {Object} e 
	* @returns {Void}
	*/
	const handleDragStart = (e) => {
		const { active } = e;
		originalListIdRef.current = active?.data?.current.listId;

		if (active.data.current.type === 'List') {
			return setDraggingList(active?.data?.current.list);
		}

		if (active.data.current.type === 'Card') {
			return setDraggingCard(active?.data?.current.card);
		}
	}

	/**
	 * Rearrange lists.
	 * 
	 * @param {Object} activeList 
	 * @param {Object} overList 
	 * @returns {Void}
	 */
	const updateListOrder = async (activeList, overList) => {
		if (activeList.id === overList.id) {
			return;
		}

		const oldIndex = lists.findIndex(list => list.id === activeList.id);
		const newIndex = lists.findIndex(list => list.id === overList.id);

		const reorderedLists = [...lists];
		const [movedList] = reorderedLists.splice(oldIndex, 1);
		reorderedLists.splice(newIndex, 0, movedList);

		updateListPosition(reorderedLists);
	}

	/**
	 * Update card order.
	 * 
	 * @param {Object} activeCard 
	 * @param {Object} overCard
	 * @returns {Void}
	 */
	const updateCardOrder = async (activeCard, overCard) => {
		const activeList = findListById(lists, activeCard.data.current.listId);
		const overList = findListById(lists, overCard.data.current.listId);

		if (!activeList || !overList) {
			return;
		}

		const activeCards = findCardsByListId(localCards, activeList.id);
		const overCards = activeList.id === overList.id
			? activeCards
			: findCardsByListId(localCards, overList.id);

		const activeCardIndex = activeCards.findIndex(card => card.id === activeCard.id);
		const overCardIndex = overCards.findIndex(card => card.id === overCard.id);
		const isSameList = originalListIdRef.current === overList.id;

		try {
			if (isSameList) {
				const updatedCards = arrayMove(activeCards, activeCardIndex, overCardIndex);
				await reorderCardsInList(updatedCards);

			} else {
				const [movedCard] = activeCards.splice(activeCardIndex, 1);
				overCards.splice(overCardIndex, 0, movedCard);

				await moveCardBetweenLists(overCards, {
					activeCard,
					overCardIndex,
					overList
				});
			}
		} catch (error) {
			console.error(error.message);
		}
	}

	/** 
	 * On drag end.
	 * 
	 * @param {Object} e
	 * @returns {Void}
	 */
	const handleDragEnd = async (e) => {
		const { active, over } = e;

		setDraggingList(null);
		setDraggingCard(null);

		const isOverAList = over?.data?.current.type === 'List';
		const isActiveACard = active?.data?.current.type === 'Card';
		const isOverACard = over?.data?.current.type === 'Card';

		if (isOverAList && !isActiveACard) {
			 return await updateListOrder(active, over);
		}

		if (isOverACard) {
			return await updateCardOrder(active, over);
		}
	}

	/**
	 * Move card between cards.
	 * 
	 * @param {Array} cards 
	 * @param {Number} activeIndex 
	 * @param {String} overId 
	 * @returns {Array}
	 */
	const moveCardBetweenCards = (cards, activeIndex, overId) => {
		const overIndex = cards.findIndex(card => card.id === overId);
		const updatedCards = [...cards];

		updatedCards[activeIndex] = {
			...updatedCards[activeIndex],
			listId: cards[overIndex].listId
		};

		return arrayMove(updatedCards, activeIndex, overIndex);
	}

	/**
	 * Move card to empty list.
	 * @param {Array} cards 
	 * @param {Number} activeIndex 
	 * @param {String} listId 
	 * @returns {Array}
	 */
	const moveCardToEmptyList = (cards, activeIndex, listId) => {
		const hasCardsInList = cards.some(card => card.listId.id === listId);
		if (hasCardsInList) {
			return cards;
		};

		const updatedCards = [...cards];
		updatedCards[activeIndex] = {
			...updatedCards[activeIndex],
			listId: doc(db, 'lists', listId)
		};

		return arrayMove(updatedCards, activeIndex, cards.length);
	}

	/**
	 * Handle Drag over.
	 * @param {Object} e 
	 * @returns {Void}
	 */
	const handleDragOver = (e) => {
		const { active, over } = e;

		if (!over) {
			return;
		}

		const isDraggingCard = active?.data.current?.type === 'Card';
		const isHoveringOverCard = over?.data.current?.type === 'Card';
		const isHoveringOverList = over?.data.current?.type === 'List';

		setLocalCards((cards) => {
			const activeIndex = cards.findIndex(card => card.id === active.id);

			if (isDraggingCard && isHoveringOverCard) {
				return moveCardBetweenCards(cards, activeIndex, over.id);
			}

			if (isDraggingCard && isHoveringOverList) {
				return moveCardToEmptyList(cards, activeIndex, over.id);
			}

			return cards;
		});
	}

	/**
	 * Custom Collision detection algorithm.
	 * 
	 * @param {Object} args
	 * @returns {Function}
	 */
	const customCollisionDetectionAlgorithm = useCallback((args) => {
		const { active, droppableContainers } = args;

		if (active?.data.current?.type === 'List') {
			return closestCenter({
				...args,
				droppableContainers: droppableContainers.filter(container =>
					container.data.current?.type === 'List'
				)
			});
		}

		return pointerWithin(args);
	}, []);

	return (
		<DndContext
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragOver={handleDragOver}
			sensors={sensors}
			collisionDetection={customCollisionDetectionAlgorithm}
			measuring={{
				droppable: {
					strategy: MeasuringStrategy.Always
				}
			}}
		>
			{React.Children.map(children, child =>
				React.cloneElement(child, { cards: localCards })
			)}

			{createPortal(
				<DragOverlay>
					{draggingList && (
						<ListBoard
							list={draggingList}
							boardId={boardId}
							cards={findCardsByListId(localCards, draggingList.id)}
						/>
					)}

					{draggingCard && <Card card={draggingCard} />}
				</DragOverlay>
				, document.body
			)}
		</DndContext>
	);
};

export default BoardDragAndDrop;