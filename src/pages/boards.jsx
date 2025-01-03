/**
 * Internal dependencies.
 */
import Stack from '@/components/stack/stack';
import BoxBoard from '@/components/box-board/box-board';
import Section from '@/components/section/section';

/**
 * Internal dependencies.
 */
import useBoards from '@/hooks/boards/use-boards';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';
import Popover from '@/components/popover/popover';
import Button from '@/components/button/button';
import FormAddBoard from '@/components/form-add-board/form-add-board';

const Boards = () => {
	const { boards, isLoading } = useBoards();

	const renderContent = () => {
		if (isLoading) {
			return <LoadingSpinner className="section__spinner" width="60" />;
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
				{!isLoading && (
					<Stack.Item cols="5" style={{display: "flex"}}>
						<Popover
						triggerStyle={{width: "100%"}}	
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
							<FormAddBoard />
						</Popover>
					</Stack.Item>
				)}

				{renderContent()}
			</Stack>
		</Section>
	);
}

export default Boards;