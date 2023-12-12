import { useDispatch } from 'react-redux'
import { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'

import { AppDispatch, RootState } from '../../redux/store'
import { addUser, UserInputType } from '../../redux/slices/userSlice'

import { UserForm } from './UserForm'
import api from '../../api'

const initialUserState: UserInputType = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'visitor',
  isBlocked: false
}

export function SignUp() {
  const dispatch = useDispatch<AppDispatch>()
  const naigate = useNavigate()

  const [user, setUser] = useState<UserInputType>(initialUserState)

  type Inputs = {
    firstName: string
    lastName: string
    email: string
    password: string
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const formSubmit: SubmitHandler<Inputs> = async () => {
    console.log('data', user)
    // add user
    // dispatch(addUser(user))
    const { data } = await api.post('/users/register', user)
    // Reset the form
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
    </div>
  )
}
