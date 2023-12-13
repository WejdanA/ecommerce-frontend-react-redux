import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { removeUser, updateRole, block } from '../../../redux/slices/userSlice'

import { AppDispatch, RootState } from '../../../redux/store'

import { Link } from 'react-router-dom'
import api from '../../../api'
import { Admin } from '../Admin'
import { usersRequest, usersSuccess } from '../../../redux/slices/userSlice'

export function UsersManager() {
  const dispatch = useDispatch<AppDispatch>()
  const { users, isLoading } = useSelector((state: RootState) => state.users)
  console.log('users in user manger', users)

  const handleGetUsers = async () => {
    dispatch(usersRequest())
    const res = await api.get('/users')
    dispatch(usersSuccess(res.data))
    console.log('users in user manger', res.data)
  }

  useEffect(() => {
    handleGetUsers()
  }, [])

  return (
    <div className="main-content">
      <Admin />
      {isLoading && <h3> Loading users...</h3>}
      <div className="local-bootstrap">
        <table className="table table-stripe">
          <thead className="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">first name</th>
              <th scope="col">last name</th>
              <th scope="col">email</th>
              <th scope="col">operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="user-details">
                <td>{user._id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>

                <td>
                  <button className="block-btn" onClick={(e) => dispatch(block(user._id))}>
                    {user.isBanned ? 'unBanned' : 'Banned'}
                  </button>
                  <select
                    name="role"
                    id="role"
                    defaultValue={user.isAdmin ? 'Admin' : 'Vistor'}
                    onClick={(e) =>
                      dispatch(updateRole({ userId: user._id, role: e.target.value }))
                    }>
                    <option value="visitor">visitor</option>
                    <option value="admin">admin</option>
                  </select>
                  <button className="remove-btn" onClick={() => dispatch(removeUser(user._id))}>
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
