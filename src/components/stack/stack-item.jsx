import classNames from 'classnames';

const StackItem = (props) => {
	const {
		cols,
		children,
		className
	} = props;

	return (
		<div className={classNames('stack__item', className)} style={{'--cols': cols}}>
			{children}
		</div>
	)
}

export default StackItem;