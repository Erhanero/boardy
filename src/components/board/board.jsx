/**
 * External dependencies.
 */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import BoardList from '@/components/board-list/board-list';
import Stack from '@/components/stack/stack';
import EditableText from '@/components/editable-text/editable-text';
import useLists from '@/data/boards/use-lists';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';
import useBoard from '@/data/boards/use-board';

const Board = () => {
    const { boardId } = useParams();
    const { board, isLoading: isBoardLoading } = useBoard(boardId);
    const { lists, isLoading: isListsLoading } = useLists(boardId);

    const renderContent = () => {
        if (isListsLoading) {
            return <LoadingSpinner className="board__spinner" width="60" />;
        }

        if (!lists?.length) {
            return <p>No lists available</p>;
        }

        return lists.map((list) => (
            <BoardList key={list.id} id={list.id} title={list.title} />
        ));
    };

    if (!board) {
        return <p style={{padding: '50px', textAlign: 'center'}}>Board not found</p>;
    }

    return (
        <div className="board">
            <div className="board__head">
                {!isBoardLoading && <EditableText initialText={board.title} fontSize="22px" />}
            </div>

            <Stack className="board__inner" alignItems="flex-start" columnGap="20" >
                {renderContent()}
            </Stack>
        </div>
    );
};

export default Board;
