import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
import { activate, clearUserMessage } from '../../redux/slices/userSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { Messages } from '../../utils/Messages'

export const ActivateAccount = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const { error, success } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(activate(token))
  }, [token])

  return (
    <>
      <div className="main-content product-container">your request is proccesed</div>
      <Messages error={error} success={success} clearMessage={clearUserMessage} />
    </>
  )
}
