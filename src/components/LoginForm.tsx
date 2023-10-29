import React from 'react'
import { useForm } from 'react-hook-form'
import './styles.css'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Email</label>
          <input type="text" {...register('email')} name="email" />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type="password" {...register('password')} name="password" />
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}
