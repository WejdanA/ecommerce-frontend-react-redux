import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { RootState } from '../../redux/store'
import { LoginForm } from '../user/LoginForm'
export const AdminRoute = () => {
  const { isLogin, loginUser } = useSelector((state: RootState) => state.users)

  return isLogin && loginUser?.isAdmin ? <Outlet /> : <LoginForm />
}
