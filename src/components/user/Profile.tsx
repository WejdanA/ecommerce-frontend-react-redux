import { useNavigate } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useState, ChangeEvent, useEffect } from 'react'

import { UserForm } from './UserForm'

import { editUser, UserType } from '../../redux/slices/userSlice'
import { getOrdersByUser } from '../../redux/slices/orderSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { Orders } from '../admin/orders/Orders'

const initialUserState: UserType = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'visitor',
  isBlocked: false
}

export function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const { loginUser } = useSelector((state: RootState) => state.users)
  const { userOrders } = useSelector((state: RootState) => state.orders)

  const [user, setUser] = useState<UserType>(initialUserState)

  type Inputs = {
    firstName: string
    lastName: string
    email: string
    password: string
  }

  useEffect(() => {
    setUser(loginUser)
    dispatch(getOrdersByUser(loginUser?.id))
  }, [loginUser])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const formSubmit: SubmitHandler<Inputs> = (data) => {
    // update the user
    console.log('user', user)
    dispatch(editUser(user))
    // Reset the form
    setUser(initialUserState)
    navigate('/')
  }

  return (
    <div>
      <UserForm
        formSubmit={formSubmit}
        handleChange={handleChange}
        newUser={user}
        formType={'Update'}
      />
      <Orders orders={userOrders} />.
    </div>
  )
}
