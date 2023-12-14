import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../redux/store'
import { useSelector, useDispatch } from 'react-redux'

import { UserType } from '../../../redux/slices/userSlice'

export const User = () => {
  const { id } = useParams()

  const { user } = useSelector((state: RootState) => state.users)

  const dispatch = useDispatch()

  useEffect(() => {}, [id])

  return (
    <>
      {user ? (
        <div className="main-content">
          <div id="id" className="user-details">
            {user._id}
          </div>
          <div id="first-name" className="user-details">
            {user.firstName}
          </div>
          <div id="last-name" className="user-details">
            {user.lastName}
          </div>

          <div id="email" className="user-details">
            {user.email}
          </div>
          <div id="password" className="user-details">
            {user.password}
          </div>
          <div id="role" className="user-details">
            {user.isAdmin}
          </div>
        </div>
      ) : (
        <div>User Not Found</div>
      )}
    </>
  )
}
