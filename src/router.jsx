/**
 * External dependencies
 */
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import Boards from '@/pages/boards';
import MainLayout from '@/layouts/main-layout';
import Login from '@/pages/login';
import Register from '@/pages/register';
import NotFound from '@/pages/not-found';
import BoardPage from '@/pages/board-page';
import PrivateRoute from '@/components/private-route/private-route';
import { useAuth } from '@/contexts/auth';
import { useLoading } from '@/contexts/loading';


const Router = () => {
	const { isLoading } = useLoading();
	const { isAuthenticated, isAuthLoading } = useAuth();

    if (isAuthLoading || isLoading) {
        return null; 
    }

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainLayout />} >						
					<Route element={<PrivateRoute />} >
						<Route index element={<Boards />} />					
						<Route path="/board" element={<BoardPage />} />
					{/* <Route path="/boards/:id" element={<BoardPage />} /> */}
					{/* <Route path="/create-board" element={<CreateBoard />} /> */}
					</Route>

					<Route
                        path="/login"
                        element={
                            isAuthenticated ? <Navigate to="/" replace /> : <Login />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            isAuthenticated ? <Navigate to="/" replace /> : <Register />
                        }
                    />
					<Route path="*" element={<NotFound />} />
				</Route>

			</Routes>
		</BrowserRouter >
	)
}

export default Router;