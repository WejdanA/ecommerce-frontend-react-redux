import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

import { AppDispatch, RootState } from '../../../redux/store'

import api from '../../../api'
import { Admin } from '../Admin'
import { fetchUsersData } from '../../../redux/slices/userSlice'

export function UsersManager() {
  const dispatch = useDispatch<AppDispatch>()
  const { users, isLoading } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(fetchUsersData())
  }, [])

  const handleBanUser = async (_id: string, isBanned: boolean) => {
    try {
      const { data } = isBanned
        ? await api.put(`/users/unban/${_id}`)
        : await api.put(`/users/ban/${_id}`)

      dispatch(fetchUsersData())
    } catch (error: any) {
      notifyError(error.response.data.msg)
    }
  }
  const handleUserRole = async (_id: string, isAdmin: boolean) => {
    try {
      const { data } = isAdmin
        ? await api.put(`/users/notadmin/${_id}`)
        : await api.put(`/users/admin/${_id}`)

      dispatch(fetchUsersData())
    } catch (error: any) {
      notifyError(error.response.data.msg)
    }
  }
  const handleDeleteUser = async (_id: string) => {
    try {
      const { data } = await api.delete(`/users/${_id}`)

      dispatch(fetchUsersData())
    } catch (error: any) {
      notifyError(error.response.data.msg)
    }
  }

  const notifyError = (message: string) => toast.error(message + '. try again!')

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

                    <button className="remove-btn" onClick={() => handleDeleteUser(user._id)}>
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ToastContainer />
        </div>
      )}
    </div>
  )
}
