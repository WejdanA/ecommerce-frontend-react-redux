import { useNavigate } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useState, ChangeEvent, useEffect } from 'react'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

import api from '../../api'
import { UserForm } from './UserForm'
import { fetchUserData, UserType } from '../../redux/slices/userSlice'
import { getOrdersByUser } from '../../redux/slices/orderSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { Orders } from '../admin/orders/Orders'

const initialUserState: UserType = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isAdmin: false,
  isBanned: false
}

export function Profile() {
  const dispatch = useDispatch<AppDispatch>()
  const { loginUser } = useSelector((state: RootState) => state.users)
  const { userOrders } = useSelector((state: RootState) => state.orders)

  const [user, setUser] = useState<UserType>(initialUserState)

  type Inputs = {
    firstName: string
    lastName: string
    email: string
  }

  useEffect(() => {
    setUser(loginUser)
  }, [loginUser])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const formSubmit: SubmitHandler<Inputs> = async (user) => {
    try {
      const { data } = await api.put('/users/profile', user)
      dispatch(fetchUserData())
      notifySuccess()
    } catch (error: any) {
      notifyError(error.response.data.msg)
    }
  }

  const notifySuccess = () => toast.success('your profile was updated successfuly')
  const notifyError = (message: string) => toast.error(message + '. please try again')

  return (
    <div>
      <UserForm
        formSubmit={formSubmit}
        handleChange={handleChange}
        newUser={user}
        formType={'Update'}
      />
      <Orders orders={userOrders} />.
      <ToastContainer />
    </div>
  )
}
