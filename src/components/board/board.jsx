/**
 * External dependencies.
 */
import { useState, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
    DndContext,
    DragOverlay,
    useSensors,
    useSensor,
    PointerSensor,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import {doc} from 'firebase/firestore';
import { db } from '@/services/firebase';

/**
 * Internal dependencies.
 */
import ListBoard from '@/components/list-board/list-board';
import Stack from '@/components/stack/stack';
import EditableText from '@/components/editable-text/editable-text';
import useLists from '@/hooks/lists/use-lists';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';
import useBoard from '@/hooks/boards/use-board';
import Button from '@/components/button/button';
import FormAddList from '@/components/form-add-list/form-add-list';
import Popover from '@/components/popover/popover';
import useUpdateBoard from '@/hooks/boards/use-update-board';
import NavActions from '@/components/nav-actions/nav-actions';
import ModalConfirm from '@/components/modal-confirm/modal-confirm';
import useDeleteBoard from '@/hooks/boards/use-delete-board';
import listService from '@/services/list-service';
import Card from '@/components/card/card';
import useCards from '@/hooks/cards/use-cards';

const Board = () => {
    const { boardId } = useParams();
    const { board, isLoading: isBoardLoading } = useBoard(boardId);
    const { lists, isLoading: isListsLoading } = useLists(boardId);
    const { deleteBoard } = useDeleteBoard();
    const { updateBoard } = useUpdateBoard();

    const [reorderedLists, setReorderedLists] = useState(null);
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
    const [draggingList, setDraggingList] = useState(null);
    const displayedLists = reorderedLists || lists;
    const listsIds = useMemo(() => lists.map(list => list.id), [lists]);

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
     * Handle delete click.
     * 
     * @returns {Void}
     */
    const handleDeleteClick = () => {
        setIsModalConfirmOpen(true);
    }

    /**
     * Handle delete confirm.
     * 
     * @returns {Void}
     */
    const handleDeleteConfirm = async () => {
        try {
            await deleteBoard(boardId);
            setIsModalConfirmOpen(false);

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
        const updatedLists = arrayMove(lists, oldIndex, newIndex);

        setReorderedLists(updatedLists.map((list, index) => ({
            ...list,
            position: index
        })));

        try {
            await listService.updateListsPositions(updatedLists);

        } catch (error) {
            console.error(error.message);

        } finally {
            setReorderedLists(null);
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
        const activeList = findListById(activeCard.data.current.listId);
        const overList = findListById(overCard.data.current.listId);

        if (!activeList || !overList) {
            return;
        }

        const activeCards = findCardsByListId(activeList.id);
        const overCards = activeList.id === overList.id
            ? activeCards
            : findCardsByListId(overList.id);

        const activeCardIndex = activeCards.findIndex(card => card.id === activeCard.id);
        const overCardIndex = overCards.findIndex(card => card.id === overCard.id);
        const isSameList = originalListIdRef.current === overList.id;

        try {
            if (isSameList) {
               reorderCardsInList(activeCards, {
                    activeCardIndex,
                    overCardIndex
                });

            } else {
                const [movedCard] = activeCards.splice(activeCardIndex, 1);
                overCards.splice(overCardIndex, 0, movedCard);

                moveCardBetweenLists(activeCards, overCards, {
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
     * Find list by id.
     * 
     * @param {String} id 
     * @returns {Object}
     */
    const findListById = (id) => {
        return lists.find(list => list.id === id);
    };

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
        const isOverAList = over.data.current?.type === 'List';

        if (isActiveACard) {
            let newListId;

            if (isOverACard) {
                newListId = over.data.current.listId;
            } else if (isOverAList) {
                newListId = over.id;
            }

            if (newListId && active.data.current.listId !== newListId) {
                updateCardListId(active.id, newListId);
                active.data.current.listId = newListId;
            }
        }
    }

    /**
     * Get cards by list id.
     * 
     * @param {param} listId 
     * @returns {Array}
     */
    const findCardsByListId = (listId) => {
        const listRef = doc(db, 'lists', listId);
        return cards.filter(card => card.listId.path === listRef.path)
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            }
        })
    );

    /**
     * Render board content.
     * 
     * @returns {JSXElement | JSXELement[]}
     */
    const renderBoardContent = () => {
        if (isListsLoading) {
            return <LoadingSpinner className="board__spinner" width="60" />;
        }

        return displayedLists.map((list) => {
            return (
                <ListBoard
                    key={list.id}
                    boardId={boardId}
                    list={list}
                    cards={findCardsByListId(list.id)}
                />
            )
        })

    };

    if (!board && !isBoardLoading) {
        return <p style={{ padding: '50px', textAlign: 'center' }}>Board not found</p>;
    }

    return (
        <div className="board">
            <div className="board__head">
                {!isBoardLoading &&
                    <>
                        <EditableText
                            initialText={board.title}
                            fontSize="22px"
                            onBlur={updateBoardTitle}
                        />

                        <Popover
                            position="bottom"
                            trigger={
                                <Button variant="icon" >
                                    <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" fill="currentColor"></path>
                                    </svg>
                                </Button>
                            }>
                            <NavActions
                                title="Board Actions"
                                links={[
                                    {
                                        label: "Delete Board",
                                        onClick: handleDeleteClick
                                    },
                                ]}
                            />
                        </Popover>
                    </>
                }
            </div>

            <Stack className="board__inner" alignItems="flex-start" columnGap="20" >
                <DndContext
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    sensors={sensors}
                >
                    <SortableContext items={listsIds}>
                        {renderBoardContent()}
                    </SortableContext>

                    {createPortal(
                        <DragOverlay>
                            {draggingList && (
                                <ListBoard
                                    list={draggingList}
                                    boardId={boardId}
                                    cards={findCardsByListId(draggingList.id)}
                                />
                            )}

                            {draggingCard && <Card card={draggingCard} />}
                        </DragOverlay>
                        , document.body
                    )}
                </DndContext>

                {!isListsLoading && (
                    <Popover
                        trigger={<Button variant="blue">+ Add a list</Button>}
                    >
                        {(closePopover) => (
                            <FormAddList
                                boardId={boardId}
                                onSuccess={() => {
                                    closePopover();
                                }}
                            />
                        )}
                    </Popover>
                )}
            </Stack>

            <ModalConfirm
                isOpen={isModalConfirmOpen}
                onClose={() => setIsModalConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Board"
                message={
                    <>
                        Are you sure you want to delete this board? <br /> All cards and lists in this board will be deleted too.
                    </>
                }
            />
        </div>
    );
};

export default Board;
