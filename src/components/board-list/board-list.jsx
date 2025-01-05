/**
 * Internal dependencies.
 */
import Cards from '@/components/cards/cards';
import EditableText from '@/components/editable-text/editable-text';
import useUpdateList from '@/hooks/lists/use-update-list';

const BoardList = ({ boardId, listId, title }) => {
	const {updateList} = useUpdateList();

	const handleListTitleUpdate = async (updatedTitle) => {
		await updateList({ title: updatedTitle }, listId);
	}
	
	return (
		<div className="board-list">
			<EditableText initialText={title} onBlur={handleListTitleUpdate} className="board__title" />

			<Cards listId={listId} boardId={boardId} />
		</div>
	);
}

export default BoardList;