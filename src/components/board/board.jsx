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
    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, 'boards'));
            
            querySnapshot.forEach(async (docSnapshot) => {
                const boardData = docSnapshot.data();
                console.log(docSnapshot.id, " => ", boardData);
    
                if (boardData.owner) {
                    const ownerRef = boardData.owner;
    
                    const ownerDocSnapshot = await getDoc(ownerRef);
    
                    if (ownerDocSnapshot.exists()) {
                        const ownerData = ownerDocSnapshot.data();
                        console.log("Owner Data: ", ownerData);
                    } else {
                        console.log("Owner document not found!");
                    }
                }
            });
        })();
    }, []);

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
