/**
 * Internal dependencies.
 */
import Stack from '@/components/stack/stack';
import BoxBoard from '@/components/box-board/box-board';
import Section from '@/components/section/section';

/**
 * Internal dependencies.
 */
import useGetBoards from '@/data/boards/get-boards';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';

const Boards = () => {
	const { boards, isLoading } = useGetBoards();

	const renderContent = () => {
		if (isLoading) {
		  return <LoadingSpinner width="60" />;
		}
	
		if (!boards?.length) {
		  return <p>No boards available</p>;
		}
	
		return boards.map((board) => (
		  <Stack.Item cols="5" key={board.id}>
			<BoxBoard title={board.title} />
		  </Stack.Item>
		));
	  };

	return (
		<Section title="Boards">
			<Stack wrap="wrap" columnGap="50" alignItems="flex-start" rowGap="50">
				{renderContent()}
			</Stack>
		</Section>
	);
}

export default Boards;