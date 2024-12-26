/**
 * External dependencies.
 */
import classNames from 'classnames';

const Button = (props) => {
    const {
        as: Component = 'button',
        variant,
        href,
        onClick,
        className,
        children,
        ...rest
    } = props;

    return (
        <Component
            onClick={onClick}
            href={href}
            className={classNames("button", className, variant && `button--${variant}`)}
            {...rest}
        >
            {children}
        </Component>
    );
};

export default Button;
