import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer, toast } from 'react-toastify'

import api from '../../api'

export const ActivateAccount = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const naigate = useNavigate()

  const activateAccountHandle = async (token: string | null) => {
    try {
      console.log('params', token)
      const { data } = await api.post('/users/activate', { token })
      const message = data.message
      console.log('meassage', message)
      console.log('data', data)
      notifySuccess()
    } catch (error: any) {
      console.log('error', error)
      notifyError(error.response.data.msg)
    }
  }

  const notifySuccess = () =>
    toast.success('your account was activated successfuly, you can login now')
  const notifyError = (message: string) => toast.error(message + '. Activation failed try again!')

  useEffect(() => {
    activateAccountHandle(token)
  }, [token])
  return (
    <>
      <div className="main-content product-container">your request is proccesed</div>
      <ToastContainer />
    </>
  )
}
