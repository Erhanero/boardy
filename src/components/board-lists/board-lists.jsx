/**
 * Internal dependencies.
 */
import BoardList from '@/components/board-list/board-list';
import Stack from '@/components/stack/stack';

const BoardLists = () => {
    return (
        <div className="board-lists">
            <Stack columnGap="30" justifyContent="center" style={{overflow: "auto"}}>
                <BoardList title="To do" />
                <BoardList title="In progress" />
                <BoardList title="Completed" />
            </Stack>
        </div>
    );
};

export default BoardLists;
