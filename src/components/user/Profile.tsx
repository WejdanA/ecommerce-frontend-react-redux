import { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { clearUserMessage, updateProfile } from '../../redux/slices/userSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { UserType } from '../../types/userTypes'
import { Messages } from '../../utils/Messages'
import { Orders } from '../admin/orders/Orders'
import { UserForm } from './UserForm'

export function Profile() {
  const dispatch = useDispatch<AppDispatch>()
  const { loginUser, success, error } = useSelector((state: RootState) => state.users)
  const { userOrders } = useSelector((state: RootState) => state.orders)

  const initialUserState: Partial<UserType> = {
    firstName: loginUser?.firstName,
    lastName: loginUser?.lastName,
    email: loginUser?.email
  }
  const [user, setUser] = useState<Partial<UserType>>(initialUserState)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const formSubmit: SubmitHandler<Partial<UserType>> = async (user) => {
    dispatch(updateProfile(user))
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
      <Messages error={error} success={success} clearMessage={clearUserMessage} />
    </div>
  )
}
