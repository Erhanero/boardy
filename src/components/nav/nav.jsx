/**
 * External dependencies.
 */
import { NavLink, useLocation } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import { useLogout } from '@/hooks/auth/use-logout';
import { useAuth } from '@/contexts/auth';
import Popover from '@/components/popover/popover';
import FormCreateBoard from '@/components/form-create-board/form-create-board';
import Icon from '@/components/icons/icon';

const Nav = () => {
	const { logout } = useLogout();
	const { isAuthenticated, isLoading } = useAuth();
	const location = useLocation();

	const AuthenticatedLinks = () => (
		<>
			<li>
				<Popover
					position="right"
					trigger={
						<button className="nav__link">
							<div className="nav__icon">
								<Icon name="create" />
							</div>

							<span className="nav__text">Create board</span>
						</button>
					}
				>
					<FormCreateBoard />

				</Popover>

			</li>

			<li>
				<button onClick={logout} className="nav__link">
					<span className="nav__icon">
						<Icon name="logout"/>
					</span>

					<span className="nav__text">Logout</span>
				</button>
			</li>
		</>
	)

	const UnauthenticatedLinks = () => (
		<>
			<li>
				<NavLink to="/login" className="nav__link">
					<span className="nav__icon">
							<Icon name="login" />
					</span>

					<span className="nav__text">Login</span>
				</NavLink>
			</li>

			<li>
				<NavLink to="/register" className="nav__link">
					<span className="nav__icon">						
						<Icon name="register" />
					</span>

					<span className="nav__text">Register</span>
				</NavLink>
			</li>
		</>
	)

	if (isLoading) {
		return null;
	}

	return (
		<nav className="nav">
			<ul>
				<li>
					<NavLink
						to="/boards"
						className={({ isActive }) => `nav__link ${isActive || location.pathname === '/' ? 'active' : ''}`}
					>
						<div className="nav__icon">
							<Icon name="board" />
						</div>
						
						<span className="nav__text">Boards</span>
					</NavLink>
				</li>

				{isAuthenticated ? <AuthenticatedLinks /> : <UnauthenticatedLinks />}
			</ul>
		</nav>
	);
};

export default Nav;