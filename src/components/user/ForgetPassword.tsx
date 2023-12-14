import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import api from '../../api'

type Inputs = {
  email: string
}

export const ForgetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (email) => {
    try {
      const { data } = await api.post('users/forget-password', email)

      notifySuccess(data.message)
    } catch (error: any) {
      notifyError(error.response.data.msg)
    }
  }

  const notifySuccess = (message: string) => toast.success(message)
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
          <button type="submit" className="form-btn">
            verify email
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  )
}
