import { useDispatch } from 'react-redux'
import { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'

import { AppDispatch, RootState } from '../../redux/store'
import { addUser, UserType } from '../../redux/slices/userSlice'

import { UserForm } from './UserForm'

const initialUserState: UserType = {
  id: 0,
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

  const [user, setUser] = useState<UserType>(initialUserState)

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

  const formSubmit: SubmitHandler<Inputs> = (data) => {
    user.id = +new Date()
    console.log('data', user)
    // add user
    dispatch(addUser(user))
    // Reset the form
    setUser(initialUserState)
    naigate('/login')
  }

  return (
    <div>
      <h3 className="text-2xl font-bold main-content">Add a new user</h3>
      <UserForm
        formSubmit={formSubmit}
        handleChange={handleChange}
        newUser={user}
        formType={'Add'}
      />
    </div>
  )
}
