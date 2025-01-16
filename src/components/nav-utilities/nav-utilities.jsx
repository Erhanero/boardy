/**
 * External dependencies.
 */
import { useRef, useEffect } from 'react';

/**
 * Internal dependencies.
 */
import ThemeToggle from '@/components/theme-toggle/theme-toggle';
import UserProfile from '@/components/user-profile/user-profile';
import { useAuth } from '@/contexts/auth';

const NavUtilities = () => {
	const navRef = useRef(null);
	const { user } = useAuth();

	useEffect(() => {
		if (navRef.current) {
			document.documentElement.style.setProperty('--nav-utilities-height', `${navRef.current.offsetHeight}px`);
		}
	}, []);
	
	return (
		<nav className="nav-utilities" ref={navRef}>
			<ul>
				<li>
					<ThemeToggle />
				</li>

				{user &&
					<li>
						<UserProfile />
					</li>
				}
			</ul>
		</nav>
	)
}

export default NavUtilities;