/**
 * External dependencies.
 */
import { Link } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import Button from '@/components/button/button';
import Stack from '@/components/stack/stack';

const NotFound = () => {
	return (
		<Stack alignItems="center" justifyContent="center" style={{ width: "100%", height: "100%"}}>
			<div style={{ textAlign: 'center' }}>
				<h1>Page Not Found</h1>

				<Button as={Link} to='/' variant="blue">Go Back to Home</Button>
			</div>
		</Stack>
	);
};

export default NotFound;