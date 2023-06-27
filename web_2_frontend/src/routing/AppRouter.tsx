import { Routes, Route, Navigate } from 'react-router-dom'

import PrivateRouter from './PrivateRouter'
import ProfilePage from '../pages/ProfilePage'
import OrderDetailPage from '../pages/OrderDetailPage'
import ArticleDetailPage from '../pages/ArticleDetailPage'
import { isUserLoggedIn } from '../helpers/AuthHelper'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PrivateRouter />}>
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/user_info' element={<ProfilePage />} />
        <Route path='/order_detail' element={<OrderDetailPage />} />
        <Route path='/article_detail' element={<ArticleDetailPage />} />
      </Route>
      <Route path='/login' element={!isUserLoggedIn() ? <LoginPage /> : <Navigate to='/' />} />
      <Route
        path='/register'
        element={!isUserLoggedIn() ? <RegisterPage /> : <Navigate to='/' />}
      />
    </Routes>
  )
}

export default AppRouter
