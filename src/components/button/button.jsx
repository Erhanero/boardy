 
/**
 * External dependencies.
 */
import classNames from 'classnames';

const Button = ({ as: Component = 'button', href, onClick, className, children }) => {

	return (		
		<Component onClick={onClick} href={href} className={classNames('btn', className)}>
			{ children }
		</Component>
	)
}

export default Button;