/**
 * Internal dependencies.
 */
import { useTheme } from '@/contexts/theme';
import Icon from '@/components/icons/icon';

const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button className="theme-toggle" onClick={toggleTheme}>
			<Icon name={theme === "light" ? "sun" : "moon"}/>			
		</button >
	)
}

export default ThemeToggle;