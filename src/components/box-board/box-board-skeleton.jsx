/**
 * External dependencies.
 */
import Skeleton from 'react-loading-skeleton';

/**
 * Internal dependencies.
 */
import Stack from '@/components/stack/stack';

const BoxBoardSkeleton = ({ count = 6 }) => {
	return (
		<>
			{Array(count).fill(null).map((item, index) => (
				<Stack.Item cols="5" key={index} style={{ display: "flex" }}>
					<div
						className="box-board"
						style={{
							display: "block",
							width: "100%",
							padding: 0
						}}
					>
						<Skeleton
							width="100%"
							height="100%"
							style={{
								borderRadius: '1rem',
								display: "block"
							}}
						/>
					</div>
				</Stack.Item>
			))}
		</>
	);
};

export default BoxBoardSkeleton;