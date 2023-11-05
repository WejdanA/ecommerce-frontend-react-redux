import { useDispatch, useSelector } from 'react-redux'

import { removeUser, updateRole, block } from '../../../redux/slices/userSlice'

import { AppDispatch, RootState } from '../../../redux/store'

import { Link } from 'react-router-dom'
import { Admin } from '../Admin'

export function UsersManager() {
  const dispatch = useDispatch<AppDispatch>()
  const { users, isLoading } = useSelector((state: RootState) => state.users)

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
              <tr key={user.id} className="user-details">
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>

                <td>
                  <button className="block-btn" onClick={(e) => dispatch(block(user.id))}>
                    {user.isBlocked ? 'unBlock' : 'Block'}
                  </button>
                  <select
                    name="role"
                    id="role"
                    defaultValue={user.role}
                    onClick={(e) =>
                      dispatch(updateRole({ userId: user.id, role: e.target.value }))
                    }>
                    <option value="visitor">visitor</option>
                    <option value="admin">admin</option>
                  </select>
                  <button className="remove-btn" onClick={() => dispatch(removeUser(user.id))}>
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
