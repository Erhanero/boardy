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