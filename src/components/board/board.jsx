/**
 * External dependencies.
 */
import { useState } from 'react';
import { useParams} from 'react-router-dom';

/**
 * Internal dependencies.
 */
import BoardList from '@/components/board-list/board-list';
import Stack from '@/components/stack/stack';
import EditableText from '@/components/editable-text/editable-text';
import useLists from '@/hooks/lists/use-lists';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';
import useBoard from '@/hooks/boards/use-board';
import Button from '@/components/button/button';
import FormAddList from '@/components/form-add-list/form-add-list';
import Popover from '@/components/popover/popover';

const Board = () => {
    const { boardId } = useParams();
    const { board, isLoading: isBoardLoading } = useBoard(boardId);
    const { lists, isLoading: isListsLoading } = useLists(boardId);

    const renderContent = () => {
        if (isListsLoading) {
            return <LoadingSpinner className="board__spinner" width="60" />;
        }

        return lists.map((list) => (
            <BoardList boardId={boardId} key={list.id} listId={list.id} title={list.title} />
        ));
    };

    if (!board && !isBoardLoading) {
        return <p style={{ padding: '50px', textAlign: 'center' }}>Board not found</p>;
    }

    return (
        <div className="board">
            <div className="board__head">
                {!isBoardLoading && <EditableText initialText={board.title} fontSize="22px" />}
            </div>

            <Stack className="board__inner" alignItems="flex-start" columnGap="20" >
                {renderContent()}

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
        </div>
    );
};

export default Board;
