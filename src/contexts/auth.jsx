/**
 * External dependencies.
 */
import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useLoading } from '@/contexts/loading';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAuthLoading, setIsAuthLoading] = useState(true);
	const { showLoading, hideLoading } = useLoading();

	/**
	 * Hande auth state change.
	 * 
	 * @param {Object} firebaseUser
	 * @returns {Void}
	 */
	const handleAuthStateChange = (firebaseUser) => {
		if (firebaseUser) {
			setUser({
				email: firebaseUser.email,
				uid: firebaseUser.uid,
			});
			setIsAuthenticated(true);
		} else {
			setUser(null);
			setIsAuthenticated(false);
		}
		setIsAuthLoading(false);
		hideLoading();
	};

	useEffect(() => {
		const auth = getAuth();
		showLoading();
		const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

		return () => {
			unsubscribe();
			hideLoading();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, isAuthLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

/**
 * Custom hook to use the AuthContext.
 * 
 * @returns {Object} Auth context value.
 */
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };