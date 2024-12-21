const Stack = (props) => {
    const {
        direction,
        alignItems,
        justifyContent,
        columnGap = 0,
        rowGap = 0,
        children,
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
            }}
        >
            {children}
        </div>
    );
};

export default Stack;
