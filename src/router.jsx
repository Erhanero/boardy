/**
 * External dependencies
 */
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Boards from '@/pages/boards';
import MainLayout from '@/layouts/main-layout';
import Login from '@/pages/login';
import Register from '@/pages/register';
import PageNotFound from '@/pages/page-not-found';
import BoardPage from '@/pages/board-page';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainLayout />} >	
					<Route index element={<Boards />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/board" element={<BoardPage />} />
					{/* <Route path="/boards/:id" element={<BoardPage />} /> */}
					{/* <Route path="/create-board" element={<CreateBoard />} /> */}
					<Route path="*" element={<PageNotFound />} />
				</Route>

			</Routes>
		</BrowserRouter >
	)
}

export default Router;