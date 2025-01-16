/**
 * External dependencies.
 */
import { Outlet } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import Sidebar from '@/components/sidebar/sidebar';
import Stack from '@/components/stack/stack';
import MainContent from '@/components/main-content/main-content';
import NavUtilities from '@/components/nav-utilities/nav-utilities';

const MainLayout = () => {
	return (
		<>
			<NavUtilities />

			<Stack>
				<Sidebar />

				<MainContent>
					<Outlet />
				</MainContent>
			</Stack>
		</>
	);
}

export default MainLayout;