import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { login } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import api from '../../api'

type UserInfo = {
  email: string
  password: string
}

export const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (userInfo) => {
    try {
      const { data } = await api.post('auth/login', userInfo)
      dispatch(login(data.user))
      const message = data.message
      console.log('data', data)
      notifySuccess()
    } catch (error: any) {
      console.log('error', error.response.data.msg)
      notifyError(error.response.data.msg)
    }
  }

  const notifySuccess = () => toast.success('you logged successfully')
  const notifyError = (message: string) => toast.error(message)

  return (
    <div className="main-content contact">
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div className="input-group">
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
        <div className="errors">{errors.email && <>{errors.email.message}</>}</div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" {...register('password', { required: true })} name="password" />
          {errors.password && <span className="error">*The password can't be empty</span>}
        </div>
        <div className="input-group">
          <button type="submit" className="form-btn">
            Login
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  )
}
