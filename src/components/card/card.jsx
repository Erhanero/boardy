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
						<svg width="14" viewBox="0 0 448 512">
							<path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z">
							</path>
						</svg>
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