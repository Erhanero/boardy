/**
 * External dependencies.
 */
import classNames from 'classnames';

const Stack = (props) => {
    const {
        direction = 'row',
        alignItems,
        justifyContent,
        columnGap = 0,
        rowGap = 0,
        children,
        style,
        className,
    } = props;

    return (
        <div
            className={classNames("stack", className)}            
            style={{
                "--direction": direction,
                "--align-items": alignItems,
                "--justify-content": justifyContent,
                "--column-gap": `${columnGap}px`,
                "--row-gap": `${rowGap}px`,
                ...style
            }}
        >
            {children}
        </div>
    );
};

export default Stack;
