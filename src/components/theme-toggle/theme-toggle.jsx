/**
 * Internal dependencies.
 */
import { useTheme } from '@/contexts/theme';

const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button className="theme-toggle" onClick={toggleTheme}>
			{theme === 'light' ? (
				<svg width="24" height="24" viewBox="0 0 24 24">
					<path d="M0 0h24v24H0z" fill="none">
					</path>
					<path d="m6.76 4.84-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7 1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91 1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z">
					</path>
				</svg>
			) : (
				<svg width="24" height="24" viewBox="0 0 512 512">
					<path d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z">
					</path>
				</svg>
			)}
		</button >
	)
}

export default ThemeToggle;