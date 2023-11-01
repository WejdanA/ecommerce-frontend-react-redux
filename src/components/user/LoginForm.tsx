import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { login } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { users } = useSelector((state: RootState) => state.users)

  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    const currentUser = users.find(
      (user) => user.email == data.email && user.password == data.password
    )

    if (currentUser) {
      if (currentUser.isBlocked) {
        setError('Sorry,you are blocked please contact 123-123-1234 for more information')
        return
      } else {
        dispatch(login(currentUser))
        navigate('/')
      }
    } else {
      console.log('invalid data')
      setError('The email or the password are invalid. try again')
    }
  }

  return (
    <div className="main-content">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            id="email"
            {...register('email', {
              required: "*The email can't be empty",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: '*Please, Enter valid email'
              }
            })}
            name="email"
          />
        </div>
        <div>{errors.email && <>{errors.email.message}</>}</div>
        <div className="form-control">
          <label>Password</label>
          <input type="password" {...register('password', { required: true })} name="password" />
          {errors.password && <span className="error">*The password can't be empty</span>}
        </div>
        <div className="form-control">
          <button type="submit">Login</button>
        </div>
        <div>{error}</div>
      </form>
    </div>
  )
}
