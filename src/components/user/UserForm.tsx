import { ChangeEvent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { UserType } from '../../redux/slices/userSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

type UserFormProps = {
  newUser: UserType
  formType: string
  formSubmit: SubmitHandler<Inputs>
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => void
}

type Inputs = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export function UserForm({ newUser, formType, formSubmit, handleChange }: UserFormProps) {
  const { users } = useSelector((state: RootState) => state.users)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    values: {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password
    }
  })
  const checkEmail = () => {
    const duplicatedUser = users.find((user) => user.email == newUser.email)
    if (duplicatedUser && duplicatedUser.id != newUser.id) {
      return 'The email already exit'
    }
    return true
  }

  const inputStyle = 'contact-input'
  const labelStyle = 'block text-sm font-medium text-gray-600'

  return (
    <section id="Contact-Us" className="contact center">
      <form onSubmit={handleSubmit(formSubmit)} className="contact-form">
        <div className="input-groups">
          <div className="input-group">
            <label htmlFor="first-name" className={labelStyle}>
              First Name:
            </label>
            <input
              type="text"
              id="first-name"
              {...register('firstName', { required: true })}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.firstName && <span className="error">*The name can't be empty</span>}
          </div>
          <div className="input-group">
            <label htmlFor="last-name" className={labelStyle}>
              Last Name:
            </label>
            <input
              type="text"
              id="last-name"
              {...register('lastName', { required: true })}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.lastName && <span className="error">*The name can't be empty</span>}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="emai" className={labelStyle}>
            email:
          </label>
          <input
            type="text"
            id="email"
            {...register('email', {
              required: "*The email can't be empty",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: '*Please, Enter valid email'
              },
              validate: { value: checkEmail }
            })}
            onChange={handleChange}
            className={inputStyle}
          />
          {errors.email && <>{errors.email.message}</>}
        </div>
        <div className="input-group">
          <label htmlFor="first-name" className={labelStyle}>
            password:
          </label>
          <input
            type="text"
            id="password"
            {...register('password', { required: true })}
            onChange={handleChange}
            className={inputStyle}
          />
          {errors.password && <span className="error">*The password can't be empty</span>}
        </div>

        <button type="submit" className="form-btn">
          {formType} User
        </button>
      </form>
    </section>
  )
}
