/**
 * External dependencies.
 */
import { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useLoading } from '@/contexts/loading';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const { showLoading, hideLoading } = useLoading();

	/**
	 * Handle auth state change.
	 * 
	 * @param {Object} firebaseUser
	 * @returns {Void}
	 */
	const handleAuthStateChange = (firebaseUser) => {
		showLoading();

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

		hideLoading();
	  };
	
	useEffect(() => {
		  const auth = getAuth();		  
		  const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);		  
		  
		return unsubscribe;
	  }, []);
	  

	return (
		<AuthContext.Provider value={{ user, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export {AuthProvider, AuthContext};