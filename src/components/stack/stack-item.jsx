/**
 * External dependencies.
 */
import classNames from 'classnames';

const StackItem = (props) => {
	const {
		cols,
		children,
		className,
		style
	} = props;

	return (
		<div className={classNames('stack__item', className)} style={{'--cols': cols, ...style}}>
			{children}
		</div>
	)
}

export default StackItem;