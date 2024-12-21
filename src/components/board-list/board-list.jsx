/**
 * Internal dependencies.
 */
import Cards from '@/components/cards/cards';
import EditableText from '@/components/editable-text/editable-text';
import Button from '@/components/button/button';

const BoardList = ({title}) => {
	return (
		<div className="board-list">
			<div className="board__title">
				<EditableText text={title} />
			</div>

			<Cards/>

			<Button>+ Add a card </Button>
		</div>
	);
}

export default BoardList;