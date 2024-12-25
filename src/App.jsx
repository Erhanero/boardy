/**
* Internal dependencies.
*/
import Board from '@/components/board/board';
import Sidebar from '@/components/sidebar/sidebar';
import Stack from '@/components/stack/stack';

function App() {

    return (
        <Stack >
            <Sidebar />

            <Board />
        </Stack>
    );
}

export default App;
