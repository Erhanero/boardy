/**
 * External dependencies.
 */
import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const auth = getAuth();
		
		const cleanupAuthListener = onAuthStateChanged(auth, (firebaseUser) => {
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
			
			setIsLoading(false);
		});

		return () => cleanupAuthListener();
	}, []);

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };