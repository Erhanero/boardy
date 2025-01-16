/**
 * External dependencies.
 */
import Skeleton from 'react-loading-skeleton';

/**
 * Internal dependencies.
 */
import CardSkeleton from '@/components/card/card-skeleton';

const ListBoardSkeleton = ({ count = 4 }) => {
    return (
        <>
            {Array(count).fill(null).map((item, index) => (
                <div 
                    key={index}
					className="list-board"
                >
                    <div className="list__head">
                        <Skeleton width={150} height={24} />
                        <Skeleton circle width={32} height={32} />
					</div>

                    <div style=
                        {{
                            display: 'flex',
                        flexDirection: 'column',
                        gap: '8px', 
                        marginTop: '16px'
                        }}>
                        {Array(3).fill(null).map((item, cardIndex) => (
							<CardSkeleton key={cardIndex} />
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default ListBoardSkeleton;