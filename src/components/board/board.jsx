/**
 * External dependencies.
 */
import { useState } from 'react';
import { useParams } from 'react-router-dom';

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

const Board = () => {
    const { boardId } = useParams();
    const { board, isLoading: isBoardLoading } = useBoard(boardId);
    const { lists, isLoading: isListsLoading } = useLists(boardId);
    const { deleteBoard } = useDeleteBoard();
    const { updateBoard } = useUpdateBoard();
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

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

    const renderContent = () => {
        if (isListsLoading) {
            return <LoadingSpinner className="board__spinner" width="60" />;
        }

        return lists.map((list) => (
            <ListBoard
                boardId={boardId}
                key={list.id}
                listId={list.id}
                title={list.title}
            />
        ));
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

            <ModalConfirm
                isOpen={isModalConfirmOpen}
                onClose={() => setIsModalConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Board"
                message={
                    <>
                        Are you sure you want to delete this board? <br/> All cards and lists in this board will be deleted too.
                    </>
                }
            />
        </div>
    );
};

export default Board;
