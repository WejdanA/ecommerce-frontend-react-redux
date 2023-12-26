import { ChangeEvent, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { clearUserMessage, register } from '../../redux/slices/userSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { UserType } from '../../types/userTypes'
import { Messages } from '../../utils/Messages'
import { UserForm } from './UserForm'

const initialUserState: Partial<UserType> = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

export function SignUp() {
  const { success, error } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()
  const [user, setUser] = useState<Partial<UserType>>(initialUserState)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const formSubmit: SubmitHandler<Partial<UserType>> = async () => {
    dispatch(register(user))
    setUser(initialUserState)
  }

  return (
    <div>
      <UserForm
        formSubmit={formSubmit}
        handleChange={handleChange}
        newUser={user}
        formType={'Sign Up'}
      />
      <Messages error={error} success={success} clearMessage={clearUserMessage} />
    </div>
  )
}
