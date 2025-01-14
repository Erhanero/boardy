/**
 * External dependencies.
 */
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem('theme') || 'light';        
    });

	useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
	}, [theme]);
	
	const toggleTheme = () => {
		setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };