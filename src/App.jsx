/**
 * External dependencies.
 */
import { Toaster } from 'react-hot-toast';
import { SkeletonTheme } from 'react-loading-skeleton';

/**
 * Internal dependencies.
*/
import Router from '@/router';
import { AuthProvider } from '@/contexts/auth';
import { ThemeProvider } from '@/contexts/theme';
import { ModalProvider } from '@/contexts/modal';

function App() {

    return (
        <ModalProvider>
            <ThemeProvider>
                <SkeletonTheme
                >
                    <AuthProvider>
                        <Router />
                    </AuthProvider>

                    <Toaster
                        position="top-center"
                        toastOptions={{
                            duration: 3000,
                            style: {
                                background: '#056dd4',
                                color: '#fff',
                            },
                        }}
                    />
                </SkeletonTheme>
            </ThemeProvider>
        </ModalProvider>
    );
}

export default App;