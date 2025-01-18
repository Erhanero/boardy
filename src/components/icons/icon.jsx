/**
 * Internal dependencies.
 */
import icons from '@/components/icons/icons';

const Icon = ({ name, width = 24, height, ...props }) => {
	if (!icons[name]) {
		return null;
	}

	return (
		<svg
			width={width}
			height={height || width}
			viewBox={icons[name].viewBox}
			{...props}
		>
			{icons[name].content}
		</svg>
	);
};

export default Icon;