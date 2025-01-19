/**
 * Internal dependencies.
 */
import Stack from '@/components/stack/stack';
import Button from '@/components/button/button';
import FormCreateList from '@/components/form-create-list/form-create-list';
import Popover from '@/components/popover/popover';
import { SortableContext } from '@dnd-kit/sortable';
import ListBoard from '@/components/list-board/list-board';
import { findCardsByListId } from '@/utils/find-data';
import ListBoardSkeleton from '@/components/list-board/list-board-skeleton';
import { useModal } from '@/contexts/modal';

const BoardInner = (props) => {
	const { boardId, lists, isListsLoading, cards } = props;
	const listsIds = lists.map(list => list.id);
	const [isModalOpen] = useModal();

	return (
		<Stack className="board__inner" alignItems="flex-start" columnGap="20">
			{isListsLoading
				? <ListBoardSkeleton />

				: <>
					<SortableContext items={listsIds} disabled={isModalOpen}>
						{lists.map((list) => (
							<ListBoard
								boardId={boardId}
								key={list.id}
								list={list}
								cards={findCardsByListId(cards, list.id)}
							/>
						))}
					</SortableContext>

					<Popover trigger={<Button variant="blue">+ Add a list</Button>}>
						{(closePopover) => (
							<FormCreateList
								boardId={boardId}
								onSuccess={closePopover}
							/>
						)}
					</Popover>
				</>
			}

		</Stack>
	)
}

export default BoardInner;