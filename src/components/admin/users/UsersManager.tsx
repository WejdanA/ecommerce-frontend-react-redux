import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  clearUserMessage,
  deleteUser,
  fetchUsersData,
  updateUserBanning,
  updateUserRole
} from '../../../redux/slices/userSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { Messages } from '../../../utils/Messages'
import { Admin } from '../Admin'

export function UsersManager() {
  const { users, isLoading, success, error } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchUsersData())
  }, [dispatch])

  const handleBanUser = async (_id: string, isBanned: boolean) => {
    const bannedInfo = {
      _id: _id,
      isBanned: isBanned
    }

    dispatch(updateUserBanning(bannedInfo))
  }

  const handleUserRole = async (_id: string, isAdmin: boolean) => {
    const roleInfo = {
      _id: _id,
      isAdmin: isAdmin
    }

    dispatch(updateUserRole(roleInfo))
  }

  return (
    <div className="main-content">
      <Admin />
      {isLoading ? (
        <h3> Loading users...</h3>
      ) : (
        <div className="local-bootstrap">
          <table className="table table-stripe">
            <thead className="thead-dark">
              <tr>
                <th scope="col">id</th>
                <th scope="col">first name</th>
                <th scope="col">last name</th>
                <th scope="col">email</th>
                <th scope="col">role</th>
                <th scope="col">orders</th>
                <th scope="col">balance</th>
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
                  <td>{user.isAdmin ? 'admin' : 'visitor'}</td>
                  <td>orders</td>
                  <td>{user.balance}</td>

                  <td>
                    <button
                      className="block-btn"
                      onClick={() => handleBanUser(user._id, user.isBanned)}>
                      {user.isBanned ? 'unBanned' : 'Banned'}
                    </button>
                    <button
                      className="block-btn"
                      onClick={() => handleUserRole(user._id, user.isAdmin)}>
                      {user.isAdmin ? 'downgrade' : 'upgrade'}
                    </button>

                    <button className="remove-btn" onClick={() => dispatch(deleteUser(user._id))}>
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Messages error={error} success={success} clearMessage={clearUserMessage} />
        </div>
      )}
    </div>
  )
}
