/**
 * Internal dependencies.
 */
import Stack from '@/components/stack/stack';
import BoxBoard from '@/components/box-board/box-board';
import Section from '@/components/section/section';

const Boards = () => {
	return (
		<Section title="Boards">
			<Stack wrap="wrap" columnGap="50" alignItems="flex-start" rowGap="50">
				<Stack.Item cols="5">
					<BoxBoard title="My Board" />
				</Stack.Item>

				<Stack.Item cols="5">
					<BoxBoard title="Example Board" />
				</Stack.Item>

				<Stack.Item cols="5">
					<BoxBoard title="My Board 2" />
				</Stack.Item>

				<Stack.Item cols="5">
					<BoxBoard title="My Board 5" />
				</Stack.Item>
			</Stack>
		</Section>
	);
}

export default Boards;