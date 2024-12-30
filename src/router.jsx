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
import ProtectedRoute from '@/components/protected-route/protected-route';
import { useAuth } from '@/contexts/auth';


const Router = () => {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return null;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MainLayout />} >							
					<Route element={<ProtectedRoute />} >
						<Route path='boards' element={<Boards />} />					
						<Route index element={<Boards />} />					
						<Route path='/boards/:boardId' element={<BoardPage />} />
						{/* <Route path='/create-board' element={<CreateBoard />} /> */}
					</Route>

					<Route
						path='/login'
						element={user ? <Navigate to='/' /> : <Login />}
					/>
					<Route
						path='/register'
						element={user ? <Navigate to='/' /> : <Register />}
					/>
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter >
	)
}

export default Router;