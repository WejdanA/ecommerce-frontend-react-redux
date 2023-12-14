import { createSlice } from '@reduxjs/toolkit'

export type UserType = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean
  isBanned: boolean
}
export type UserInputType = Omit<UserType, '_id'>

export type UserState = {
  users: UserType[]
  error: null | string
  isLoading: boolean
  user: UserType | null | undefined
  isLogin: boolean
  loginUser: null | UserType
}

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  user: null,
  isLogin: false,
  loginUser: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    usersRequest: (state) => {
      state.isLoading = true
    },
    usersSuccess: (state, action) => {
      state.isLoading = false
      state.users = action.payload.allUsers
    },
    editUser: (state, action) => {
      const editedUser = action.payload
      const updatedUsers = state.users.map((user) => {
        if (user._id == editedUser.id) {
          return editedUser
        }
        return user
      })
      state.users = updatedUsers
      state.loginUser = editedUser
    },
    removeUser: (state, action) => {
      const userId = action.payload
      state.users = state.users.filter((user) => user._id !== userId)
    },
    getUserById: (state, action) => {
      state.user = state.users.find((user) => user._id == action.payload)
    },
    block: (state, action) => {
      const userId = action.payload
      const updatedBlock = state.users.map((user) => {
        if (user._id == userId) {
          user.isBanned = !user.isBanned
        }
      })
    },

    updateRole: (state, action) => {
      const { userId, isAdmin } = action.payload
      const updatedRole = state.users.map((user) => {
        if (user._id == userId) {
          user.isAdmin = !isAdmin
        }
      })
    },

    login: (state, action) => {
      state.isLogin = true
      state.loginUser = action.payload
    },
    logout: (state) => {
      state.isLogin = false
      state.loginUser = null
    }
  }
})
export const {
  usersRequest,
  usersSuccess,
  removeUser,
  getUserById,
  block,
  updateRole,
  editUser,
  login,
  logout
} = userSlice.actions

export default userSlice.reducer
