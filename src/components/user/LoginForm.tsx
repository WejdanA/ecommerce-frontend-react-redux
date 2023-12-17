import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import api from '../../api'

type Inputs = {
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
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (userInfo) => {
    try {
      const { data } = await api.post('auth/login', userInfo)
      const { password, ...user } = data.user

      dispatch(login(user))
      notifySuccess()
    } catch (error: any) {
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
        <Link to="/forget-password">Forget password ?</Link>
        <ToastContainer />
      </form>
    </div>
  )
}
