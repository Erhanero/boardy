/**
 * External dependencies.
 */
import { Link } from 'react-router-dom';

const BoxBoard = ({ id, title }) => {
	return (
		<Link to={`/boards/${id}`} className="box-board">
			<h5>{title}</h5>
		</Link>
	)
}

export default BoxBoard;