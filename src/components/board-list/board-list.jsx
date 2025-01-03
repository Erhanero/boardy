/**
 * Internal dependencies.
 */
import Cards from '@/components/cards/cards';
import EditableText from '@/components/editable-text/editable-text';

const BoardList = ({ boardId, listId, title }) => {
	
	return (
		<div className="board-list">
			<EditableText initialText={title} className="board__title" />

			<Cards listId={listId} boardId={boardId} />
		</div>
	);
}

export default BoardList;