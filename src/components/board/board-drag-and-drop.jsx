import { useState, useRef, useCallback, useEffect } from 'react';
import {
	DndContext,
	DragOverlay,
	useSensors,
	useSensor,
	PointerSensor,
	pointerWithin,
	rectIntersection,
	closestCenter,
	MeasuringStrategy,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import ListBoard from '@/components/list-board/list-board';
import Card from '@/components/card/card';
import { findCardsByListId, findListById } from '@/utils/find-data';

const BoardDragAndDrop = ({
	boardId,
	lists,
	cards,
	updateListPosition,
	reorderCardsInList,
	moveCardBetweenLists,
	updateCardListId,
	children
}) => {
	const [draggingList, setDraggingList] = useState(null);
	const [draggingCard, setDraggingCard] = useState(null);
	const originalListIdRef = useRef(null);

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

		const activeCards = findCardsByListId(cards, activeList.id);
		const overCards = activeList.id === overList.id
			? activeCards
			: findCardsByListId(cards, overList.id);

		const activeCardIndex = activeCards.findIndex(card => card.id === activeCard.id);
		const overCardIndex = overCards.findIndex(card => card.id === overCard.id);
		const isSameList = originalListIdRef.current === overList.id;

		try {
			if (isSameList) {
				const updatedCards = arrayMove(activeCards, activeCardIndex, overCardIndex);
				reorderCardsInList(updatedCards);

			} else {
				const [movedCard] = activeCards.splice(activeCardIndex, 1);
				overCards.splice(overCardIndex, 0, movedCard);

				moveCardBetweenLists(overCards, {
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
			return updateListOrder(active, over);
		}

		if (isOverACard) {
			return updateCardOrder(active, over);
		}
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

		const isActiveACard = active?.data.current?.type === 'Card';
		const isOverACard = over?.data.current?.type === 'Card';

		if (isActiveACard) {
			const newListId = isOverACard ? over?.data.current.listId : over.id;

			if (newListId && active?.data.current.listId !== newListId) {
				active.data.current.listId = newListId;
                updateCardListId(active.id, newListId);
			}
		}
	}

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

		const pointerIntersections = pointerWithin(args);
		const intersections = pointerIntersections.length > 0
			? pointerIntersections
			: rectIntersection(args);

		let overId = intersections[0]?.id;

		if (overId) {
			const overContainer = droppableContainers.find(container => container.id === overId);
			const overData = overContainer?.data.current;

			if (overData?.type === 'List') {
				const listIntersection = closestCenter({
					...args,
					droppableContainers: droppableContainers.filter(container =>
						container.data.current?.type === 'Card' &&
						container.data.current?.listId === overId
					)
				});

				if (listIntersection.length > 0) {
					return listIntersection;
				}

				return [{ id: overId }];
			}

			if (overData?.type === 'Card') {
                return [{id: overId}];
            }
		}

		return intersections;
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
			{children}

			{createPortal(
				<DragOverlay>
					{draggingList && (
						<ListBoard
							list={draggingList}
							boardId={boardId}
							cards={findCardsByListId(cards, draggingList.id)}
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