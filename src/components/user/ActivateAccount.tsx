import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

import api from '../../api'

export const ActivateAccount = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()

  const activateAccountHandle = async (token: string | null) => {
    try {
      const { data } = await api.post('/users/activate', { token })
      navigate('/login')
      notifySuccess()
    } catch (error: any) {
      notifyError(error.response.data.msg)
    }
  }

  useEffect(() => {
    activateAccountHandle(token)
  }, [token])

  const notifySuccess = () =>
    toast.success('your account was activated successfuly, you can login now')
  const notifyError = (message: string) => toast.error(message + '. Activation failed try again!')

  return (
    <>
      <div className="main-content product-container">your request is proccesed</div>
      <ToastContainer />
    </>
  )
}
