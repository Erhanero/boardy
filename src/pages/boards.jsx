/**
 * Internal dependencies.
*/
import Section from '@/components/section/section';
import BoxBoard from '@/components/box-board/box-board';
import Stack from '@/components/stack/stack';
import useBoards from '@/hooks/boards/use-boards';
import Popover from '@/components/popover/popover';
import Button from '@/components/button/button';
import FormCreateBoard from '@/components/form-create-board/form-create-board';
import BoxBoardSkeleton from '@/components/box-board/box-board-skeleton';

const Boards = () => {
	const { boards, isLoading } = useBoards();

	const renderContent = () => {
		if (isLoading) {
			return (
				<BoxBoardSkeleton count={4} />
			);
		}

		return boards.map((board) => (
			<Stack.Item cols="5" key={board.id}>
				<BoxBoard id={board.id} title={board.title} />
			</Stack.Item>
		));
	};

	return (
		
		<Section title="Boards">
			<Stack wrap="wrap" columnGap="50" alignItems="stretch" rowGap="50">
				<Stack.Item cols="5" style={{ display: "flex" }}>
					<Popover
						triggerStyle={{ width: "100%" }}
						trigger={
							<Button
								variant="lightblue"
								style={{
									height: "100%",
									borderRadius: "1rem",
									fontSize: "1.8rem",
									minWidth: "auto",
									width: "100%"
								}}>
								+ Create new board
							</Button>
						}
					>
						<FormCreateBoard />
					</Popover>
				</Stack.Item>

				{renderContent()}
			</Stack>
		</Section>
	);
}

export default Boards;