/**
 * External dependencies.
 */
import { useState} from 'react';
import classNames from 'classnames';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

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
import Icon from '@/components/icons/icon';

const ListBoard = ({list, boardId, cards}) => {
	const { updateList } = useUpdateList();
	const { deleteList } = useDeleteList();
	const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id: list.id,
		data: {
			type: 'List',
			list
		},
	});

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	  };

	/**
	 * Update list title.
	 * 
	 * @param {String}
	 * @returns {Void}
	 */
	const updateListTitle = async (updatedTitle) => {
		await updateList({ title: updatedTitle }, list.id);
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
            await deleteList(list.id);
			setIsModalConfirmOpen(false);
			
        } catch (error) {
			console.error(error.message);            
        }
	}

	return (
		<div
			className={classNames('list-board', {'is-dragging': isDragging})}
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			<div className="list__head">
				<EditableText initialText={list.title} onBlur={updateListTitle} className="list__title" />

				<Popover
					position="right"
					trigger={
					<Button variant="icon" >
						<Icon name="actions" />
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

			<Cards cards={cards} listId={list.id} boardId={boardId} />

			<ModalConfirm
				isOpen={isModalConfirmOpen}
				onClose={() => setIsModalConfirmOpen(false)}
				onConfirm={handleDeleteConfirm}
				title="Delete List"
				message={
					<>
						Are you sure you want to delete this list? <br/>  All cards in this list will be deleted too.
					</>
				}
            />
		</div>
	);
}

export default ListBoard;