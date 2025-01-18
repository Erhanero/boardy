/**
 * Internal dependencies.
 */
import { useState } from 'react';

/**
 * Internal dependencies.
 */
import EditableText from '@/components/editable-text/editable-text';
import Popover from '@/components/popover/popover';
import NavActions from '@/components/nav-actions/nav-actions';
import Button from '@/components/button/button';
import ModalConfirm from '@/components/modal-confirm/modal-confirm';
import Skeleton from 'react-loading-skeleton';
import Icon from '@/components/icons/icon';

const BoardHead = ({ title, onTitleUpdate, isLoading, onDelete }) => {
	const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

	/**
	* Handle delete click.
	* 
	* @returns {Void}
	*/
	const handleDeleteClick = () => {
		setIsModalConfirmOpen(true);
	}

	return (
		<div className="board__head">
			{isLoading &&
				<Skeleton
					width={200}
					height={32}
					style={{
						borderRadius: '4px'
					}}
				/>}

			{!isLoading &&
				<>
					<EditableText
						initialText={title}
						fontSize="22px"
						onBlur={onTitleUpdate}
					/>

					<Popover
						position="bottom"
						trigger={
							<Button variant="icon" >
								<Icon name="actions"/>
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

			<ModalConfirm
				isOpen={isModalConfirmOpen}
				onClose={() => setIsModalConfirmOpen(false)}
				onConfirm={onDelete}
				title="Delete Board"
				message={
					<>
						Are you sure you want to delete this board? <br /> All cards and lists in this board will be deleted too.
					</>
				}
			/>
		</div>
	)
}

export default BoardHead;