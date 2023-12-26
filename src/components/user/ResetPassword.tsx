import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { toast } from 'react-toastify'

import { clearUserMessage, resetPassword } from '../../redux/slices/userSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { Messages } from '../../utils/Messages'

type Inputs = {
  password: string
  repeatedPassword: string
}

export const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const { error, success } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (passwords) => {
    const { password, repeatedPassword } = passwords
    const resetPasswordInfo = {
      password,
      token
    }

    try {
      if (password != repeatedPassword) {
        throw new Error('The passwords do not match')
      }

      dispatch(resetPassword(resetPasswordInfo))
    } catch (error: any) {
      notifyError(error.message)
    }
  }

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
        <Messages error={error} success={success} clearMessage={clearUserMessage} />
      </form>
    </div>
  )
}
