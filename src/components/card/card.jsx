/**
 * External dependencies.
 */
import { useState } from 'react';
import classNames from 'classnames';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/**
 * Internal dependencies.
 */
import ModalConfirm from '@/components/modal-confirm/modal-confirm';
import Button from '@/components/button/button';
import useDeleteCard from '@/hooks/cards/use-delete-card';
import Icon from '@/components/icons/icon'

const Card = ({ card, onClick, listId }) => {
	const { id, title, description, label } = card;
	const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
	const { deleteCard } = useDeleteCard(id);

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id,
		data: {
			type: 'Card',
			card,
			listId
		},
	});

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	  };

	/**
	 * Handle delete click.
	 * 
	 * @param {Event} e 
	 * @returns {Void}
	 */
	const handleDeleteClick = (e) => {
		e.stopPropagation();
		setIsModalConfirmOpen(true);
	}

	/**
	 * Handle delete confirm.
	 * 
	 * @returns {Promise<void>}
	 */
	const handleDeleteConfirm = async () => {
		try {
			await deleteCard(id);
			setIsModalConfirmOpen(false);

		} catch (error) {
			console.error(error.message);
		}
	}

	return (
		<>
			<div
				className={classNames('card', {'is-dragging': isDragging})}
				onClick={() => onClick?.(card)}
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
			>
				<div className="card__head">
					<h3 className="card__title">{title}</h3>

					<Button variant="icon" onClick={handleDeleteClick}>
						<Icon name="trash" width="14"/>
					</Button>
				</div>

				{description && <p className="card__description">{description} </p>}

				{label && <span className="card__label">{label}</span>}
			</div>

			<ModalConfirm
				isOpen={isModalConfirmOpen}
				onClose={() => setIsModalConfirmOpen(false)}
				onConfirm={handleDeleteConfirm}
				title="Delete Card"
				message="Are you sure you want to delete this card?"
			/>
		</>
	)
}

export default Card;