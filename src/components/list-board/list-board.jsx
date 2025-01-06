/**
 * External dependencies.
 */
import { useState } from 'react';

/**
 * Internal dependencies.
 */
import Cards from '@/components/cards/cards';
import EditableText from '@/components/editable-text/editable-text';
import useUpdateList from '@/hooks/lists/use-update-list';
import useDeleteList from '@/hooks/lists/use-delete-list';
import Popover from '@/components/popover/popover';
import Button from '@/components/button/button';
import NavActions from '@/components/nav-actions/nav-actions';
import ModalConfirm from '@/components/modal-confirm/modal-confirm';

const ListBoard = ({ boardId, listId, title }) => {
	const { updateList } = useUpdateList();
	const { deleteList } = useDeleteList();
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

	/**
	 * Update list title.
	 * 
	 * @param {String}
	 * @returns {Void}
	 */
	const updateListTitle = async (updatedTitle) => {
		await updateList({ title: updatedTitle }, listId);
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
            await deleteList(listId);
			setIsModalConfirmOpen(false);
			
        } catch (error) {
			console.error(error.message);            
        }
    }

	return (
		<div className="list-board">
			<div className="list__head">
				<EditableText initialText={title} onBlur={updateListTitle} className="list__title" />

				<Popover
					position="right"
					trigger={
					<Button variant="icon" >
						<svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" fill="currentColor"></path>
						</svg>
					</Button>
				}>
					<NavActions
						title="List Actions"
						links={[
							{
								label: "Delete List",
								onClick: handleDeleteClick
							},
						]}
					/>
				</Popover>
			</div>

			<Cards listId={listId} boardId={boardId} />

			<ModalConfirm
                isOpen={isModalConfirmOpen}
                onClose={() => setIsModalConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete List"
                message="Are you sure you want to delete this list?  All cards in this list will be deleted too."
            />
		</div>
	);
}

export default ListBoard;