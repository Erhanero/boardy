/**
* Internal dependencies.
*/
import Router from '@/router';
import { AuthProvider } from '@/contexts/auth';
import { LoadingProvider } from '@/contexts/loading';

function App() {

    return (
        <LoadingProvider>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </LoadingProvider>
    );
}

export default App;