/**
 * External dependencies.
 */
import { collection, getDocs, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '@/firebase'; 

/**
 * Internal dependencies.
 */
import BoardList from '@/components/board-list/board-list';
import Stack from '@/components/stack/stack';
import EditableText from '@/components/editable-text/editable-text';

const Board = () => {
   

    return (
        <div className="board">
            <div className="board__head">
                <EditableText initialText="My Board" fontSize="22px" />
            </div>

            <Stack className="board__inner" alignItems="flex-start" columnGap="20" >
                <BoardList title="To do" />
                <BoardList title="In progress" />
                <BoardList title="Completed" />
            </Stack>
        </div>
    );
};

export default Board;
