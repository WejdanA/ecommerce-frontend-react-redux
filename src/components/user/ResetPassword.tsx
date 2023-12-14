import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'

import api from '../../api'

type Inputs = {
  password: string
  repeatedPassword: string
}

export const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (passwords) => {
    const { password, repeatedPassword } = passwords

    try {
      if (password != repeatedPassword) {
        throw new Error('The passwords do not match')
      }

      const { data } = await api.post('users/reset-password', { password, token })

      notifySuccess(data.message)
    } catch (error: any) {
      notifyError(error.response?.data.msg || error?.message)
    }
  }

  const notifySuccess = (message: string) => toast.success(message)
  const notifyError = (message: string) => toast.error(message)

  return (
    <div className="main-content contact">
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 5 })}
            name="password"
          />
          {errors.password && <span className="error">*The password can't be empty</span>}
        </div>
        <div className="input-group">
          <label>Repeat Password</label>
          <input
            type="password"
            {...register('repeatedPassword', { required: true, minLength: 5 })}
            name="repeatedPassword"
          />
          {errors.password && <span className="error">*The password can't be empty</span>}
        </div>
        <div className="input-group">
          <button type="submit" className="form-btn">
            Reset Password
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  )
}
