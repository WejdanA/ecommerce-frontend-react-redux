import { useDispatch } from 'react-redux'
import { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

import api from '../../api'
import { UserForm } from './UserForm'
import { UserInputType } from '../../redux/slices/userSlice'

const initialUserState: UserInputType = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isAdmin: false,
  isBanned: true
}

export function SignUp() {
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
    try {
      const { data } = await api.post('/users/register', user)
      notifySuccess()
      setUser(initialUserState)
    } catch (error: any) {
      notifyError(error.response.data.msg)
    }
  }
  const notifySuccess = () =>
    toast.success('your account was registered successfuly, please check your email for activation')
  const notifyError = (message: string) => toast.error(message + '. please try again')
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
