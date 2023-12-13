import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

import { logout } from '../../redux/slices/userSlice'

import api from '../../api'

export const Logout = () => {
  const naigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const { data } = await api.post('auth/logout')
      dispatch(logout())
      const message = data.message
      console.log('data', data)
      notifySuccess()
    } catch (error: any) {
      console.log('error', error.response.data.msg)
      notifyError(error.response.data.msg)
    }
  }

  const notifySuccess = () => toast.success('you logged out successufuly')
  const notifyError = (message: string) => toast.error(message + '. Activation failed try again!')

  useEffect(() => {
    handleLogout()
  }, [])
  return (
    <>
      <div className="main-content product-container">your request is proccesed</div>
      <ToastContainer />
    </>
  )
}
