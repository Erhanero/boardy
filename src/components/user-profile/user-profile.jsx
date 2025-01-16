/**
 * Internal dependencies.
 */
import Popover from '@/components/popover/popover';
import NavActions from '@/components/nav-actions/nav-actions';
import { useAuth } from '@/contexts/auth';
import { useLogout } from '@/hooks/auth/use-logout';

const UserProfile = () => {
	const { user } = useAuth();
    const { logout } = useLogout();

    if (!user) {
        return null;
	}
	
	const emailInitial = user.email.split('@')[0][0].toUpperCase();

    return (
        <Popover
            position="bottom"
            trigger={
                <button className="user-profile">
                    <span className="user-profile__avatar">
                        {emailInitial}
                    </span>
                </button>
            }
        >
            <NavActions
                title={user.email}
                links={[
                    {
                        label: "Log out",
                        onClick: logout
                    }
                ]}
            />
        </Popover>
    );
}

export default UserProfile;