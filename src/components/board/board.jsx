/**
 * External dependencies.
 */
import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
    DndContext,
    DragOverlay,
    useSensors,
    useSensor,
    PointerSensor,
    pointerWithin,
    rectIntersection,
    defaultDropAnimation
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

/**
 * Internal dependencies.
 */
import ListBoard from '@/components/list-board/list-board';
import useLists from '@/hooks/lists/use-lists';
import useBoard from '@/hooks/boards/use-board';
import useUpdateBoard from '@/hooks/boards/use-update-board';
import useDeleteBoard from '@/hooks/boards/use-delete-board';
import Card from '@/components/card/card';
import useCards from '@/hooks/cards/use-cards';
import BoardHead from '@/components/board/board-head';
import BoardInner from '@/components/board/board-inner';
import { findCardsByListId, findListById } from '@/utils/find-data';

const Board = () => {
    const { boardId } = useParams();
    const { board, isLoading: isBoardLoading } = useBoard(boardId);
    const { lists, isLoading: isListsLoading, updateListPosition } = useLists(boardId);
    const { deleteBoard } = useDeleteBoard();
    const { updateBoard } = useUpdateBoard();

    const [draggingList, setDraggingList] = useState(null);
    const [draggingCard, setDraggingCard] = useState(null);
    const {
        cards,
        reorderCardsInList,
        moveCardBetweenLists,
        updateCardListId
    } = useCards(boardId);
    const originalListIdRef = useRef(null);

    /**
     * Update board title.
     * 
     * @param {String} updatedTitle 
     * @returns {Void}
     */
    const updateBoardTitle = async (updatedTitle) => {
        await updateBoard({ title: updatedTitle }, boardId);
    }

    /**
     * Handle delete confirm.
     * 
     * @returns {Void}
     */
    const onDelete = async () => {
        try {
            await deleteBoard(boardId);

        } catch (error) {
            console.error(error.message);
        }
    }

    /**
    * On drag start.
    * 
    * @param {Object} e 
    * @returns {Void}
    */
    const handleDragStart = (e) => {
        const { active } = e;
        originalListIdRef.current = active.data.current.listId;

        if (active.data.current.type === 'List') {
            return setDraggingList(active.data.current.list);
        }

        if (active.data.current.type === 'Card') {
            return setDraggingCard(active.data.current.card);
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
     * On drag end.
     * 
     * @param {Object} e
     * @returns {Void}
     */
    const handleDragEnd = async (e) => {
        const { active, over } = e;

        setDraggingList(null);
        setDraggingCard(null);

        if (over && over.data?.current.type === 'List') {
            updateListOrder(active, over);
        }

        if (over && over.data?.current.type === 'Card') {
            updateCardOrder(active, over);
        }
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
            : findCardsByListId(overCards, overList.id);

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

                moveCardBetweenLists( overCards, {
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
     * Handle Drag over.
     * 
     * @param {Object} e 
     * @returns {Void}
     */
    const handleDragOver = (e) => {
        const { active, over } = e;

        if (!over) {
            return;
        }

        const isActiveACard = active.data.current?.type === 'Card';
        const isOverACard = over.data.current?.type === 'Card';

        if (isActiveACard) {
            const newListId = isOverACard ? over.data.current.listId : over.id;
            
            updateCardListId(active.id, newListId);

            if (newListId && active.data.current.listId !== newListId) {
                active.data.current.listId = newListId;
            }
        }
    }   

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            }
        })
    );   

    if (!board && !isBoardLoading) {
        return <p style={{ padding: '50px', textAlign: 'center' }}>Board not found</p>;
    }

    return (
        <div className="board">
            <BoardHead
                title={board?.title}
                onTitleUpdate={updateBoardTitle}
                isLoading={isBoardLoading}
                onDelete={onDelete}
            />

            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                sensors={sensors}
            >
                <BoardInner
                    boardId={boardId}
                    lists={lists}
                    cards={cards}
                    isListsLoading={isListsLoading}
                    draggingList={draggingList}
                    draggingCard={draggingCard}
                />

                {createPortal(
                    <DragOverlay dropAnimation={defaultDropAnimation}>
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
        </div>
    );
};

export default Board;