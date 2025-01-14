/**
 * External dependencies.
 */
import Skeleton from 'react-loading-skeleton';

const CardSkeleton = () => {
	return (
		<div
			className="card"
			style={{ backgroundColor: '#c6c6c6' }}
		>
			<div className="card__head">
				<Skeleton width={120} />
				<Skeleton circle width={24} height={24} />
			</div>

			<Skeleton count={2} style={{ marginTop: '8px' }} />
		</div>
	)
}

export default CardSkeleton;