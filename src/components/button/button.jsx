/**
 * External dependencies.
 */
import classNames from 'classnames';

const Button = (props) => {
    const {
        as: Component = 'button',
        href,
        onClick,
        className,
        children,
    } = props;

    return (
        <Component
            onClick={onClick}
            href={href}
            className={classNames("btn", className)}
        >
            {children}
        </Component>
    );
};

export default Button;
