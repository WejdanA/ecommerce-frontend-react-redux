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
      <div className="main-content">
        {isLoading && <h3> Loading users...</h3>}
        <div className="users">
          <ul>
            {users.map((user) => (
              <li key={user.id} className="user-details">
                <span>{user.firstName}</span>
                <span>{user.lastName}</span>
                <Link to={`/admin/users/${user.id}`}>
                  <button className=" ">More Details</button>
                </Link>

                <button className="block-btn" onClick={(e) => dispatch(block(user.id))}>
                  {user.isBlocked ? 'unBlock' : 'Block'}
                </button>

                <select
                  name="role"
                  id="role"
                  defaultValue={user.role}
                  onClick={(e) => dispatch(updateRole({ userId: user.id, role: e.target.value }))}>
                  <option value="visitor">visitor</option>
                  <option value="admin">admin</option>
                </select>
                <button className="delete-btn" onClick={() => dispatch(removeUser(user.id))}>
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
