/**
 * External dependencies.
 */
import { Toaster } from 'react-hot-toast';

/**
* Internal dependencies.
*/
import Router from '@/router';
import { AuthProvider } from '@/contexts/auth';

function App() {

    return (
        <>
            <AuthProvider>
                <Router />
            </AuthProvider>

            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#056dd4',
                        color: '#fff',
                    },
                }}
            />
        </>
    );
}

export default App;