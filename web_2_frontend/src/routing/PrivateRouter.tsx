import { Navigate, Outlet } from 'react-router-dom'

import { isUserLoggedIn } from '../helpers/AuthHelper'

const PrivateRouter = () => {
  return isUserLoggedIn() ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRouter
