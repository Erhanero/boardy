/**
 * Internal dependencies.
 */
import Nav from '@/components/nav/nav';
import ThemeToggle from '@/components/theme-toggle/theme-toggle';

const Sidebar = () => {

	return (
		<div className="sidebar">	
			<ThemeToggle />
			
			<Nav/>
		</div>
	)
}

export default Sidebar;