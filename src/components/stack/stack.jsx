/**
 * External dependencies.
 */
import classNames from 'classnames';

/**
 * Internal dependencies.
 */
import StackItem from '@/components/stack/stack-item';

const Stack = (props) => {
    const {
        direction = 'row',
        wrap,
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
                "--wrap": wrap,
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

Stack.Item = StackItem;

export default Stack;