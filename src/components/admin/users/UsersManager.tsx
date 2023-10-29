import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { removeUser, blockUser } from '../../../redux/slices/userSlice'

import { AppDispatch, RootState } from '../../../redux/store'

import { Link } from 'react-router-dom'

export function UsersManager() {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.users)
  console.log(users)

  return (
    <div className="main-content">
      {users.isLoading && <h3> Loading users...</h3>}
      <div className="users">
        <ul>
          {users.users.map((user) => (
            <li key={user.id} className="user-details">
              <span>{user.firstName}</span>
              <span>{user.lastName}</span>
              <Link to={`/home/admin/users/${user.id}`}>
                <button className=" ">More Details</button>
              </Link>
              <button
                className="block-btn"
                onClick={() => {
                  dispatch(blockUser(user.id))
                }}>
                block
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  dispatch(removeUser(user.id))
                }}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
