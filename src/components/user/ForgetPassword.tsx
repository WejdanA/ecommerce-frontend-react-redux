import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { clearUserMessage, forgetPassword } from '../../redux/slices/userSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { Messages } from '../../utils/Messages'

type Inputs = {
  email: string
}

export const ForgetPassword = () => {
  const { error, success } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(forgetPassword(data.email))
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
          <button type="submit" className="form-btn">
            verify email
          </button>
        </div>
      </form>
      <Messages error={error} success={success} clearMessage={clearUserMessage} />
    </div>
  )
}
