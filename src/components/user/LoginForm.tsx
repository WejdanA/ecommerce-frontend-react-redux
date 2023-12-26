import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearUserMessage, login } from '../../redux/slices/userSlice'

import { AppDispatch, RootState } from '../../redux/store'
import { Messages } from '../../utils/Messages'

type Inputs = {
  email: string
  password: string
}

export const LoginForm = () => {
  const { error, success } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (userInfo) => {
    dispatch(login(userInfo))
    // navigate('/user/profile')
  }

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
      </form>
      <Messages error={error} success={success} clearMessage={clearUserMessage} />
    </div>
  )
}
