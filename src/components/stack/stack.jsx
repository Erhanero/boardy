const Stack = (props) => {
    const {
        direction = 'row',
        alignItems,
        justifyContent,
        columnGap = 0,
        rowGap = 0,
        children,
        style,
    } = props;

    return (
        <div
            className="stack"
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
