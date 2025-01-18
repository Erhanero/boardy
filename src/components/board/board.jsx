/**
 * External dependencies.
 */
import { useParams } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import useLists from '@/hooks/lists/use-lists';
import useBoard from '@/hooks/boards/use-board';
import useUpdateBoard from '@/hooks/boards/use-update-board';
import useDeleteBoard from '@/hooks/boards/use-delete-board';
import useCards from '@/hooks/cards/use-cards';
import BoardHead from '@/components/board/board-head';
import BoardInner from '@/components/board/board-inner';
import BoardDragAndDrop from '@/components/board/board-drag-and-drop';

const Board = () => {
    const { boardId } = useParams();
    const { board, isLoading: isBoardLoading } = useBoard(boardId);
    const { lists, isLoading: isListsLoading, updateListPosition } = useLists(boardId);
    const { deleteBoard } = useDeleteBoard();
    const { updateBoard } = useUpdateBoard();
    const {
        cards,
        reorderCardsInList,
        moveCardBetweenLists,
        updateCardListId
    } = useCards(boardId);

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

            <BoardDragAndDrop
                boardId={boardId}
                lists={lists}
                cards={cards}
                updateListPosition={updateListPosition}
                reorderCardsInList={reorderCardsInList}
                moveCardBetweenLists={moveCardBetweenLists}
                updateCardListId={updateCardListId}
            >
                <BoardInner
                    boardId={boardId}
                    lists={lists}
                    cards={cards}
                    isListsLoading={isListsLoading}
                />
            </BoardDragAndDrop>
        </div>
    );
};

export default Board;
