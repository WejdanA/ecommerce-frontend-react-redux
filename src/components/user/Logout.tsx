import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import { clearUserMessage, logout } from '../../redux/slices/userSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { Messages } from '../../utils/Messages'

export const Logout = () => {
  const { error, success } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(logout())
    // navigate('/login')
  }, [])

  return (
    <>
      <div className="main-content product-container">you are logging out...</div>
      <Messages error={error} success={success} clearMessage={clearUserMessage} />
    </>
  )
}
