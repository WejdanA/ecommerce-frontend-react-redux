import { createSlice } from '@reduxjs/toolkit'

export type UserType = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  isBlocked: boolean
}
export type UserInputType = Omit<UserType, 'id'>

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
    addUser: (state, action) => {
      const user = action.payload
      state.users = [user, ...state.users]
    },
    editUser: (state, action) => {
      const editedUser = action.payload
      const updatedUsers = state.users.map((user) => {
        if (user.id == editedUser.id) {
          return editedUser
        }
        return user
      })
      state.users = updatedUsers
      state.loginUser = editedUser
    },
    removeUser: (state, action) => {
      const userId = action.payload
      state.users = state.users.filter((user) => user.id !== userId)
    },
    getUserById: (state, action) => {
      state.user = state.users.find((user) => user.id == action.payload)
    },
    block: (state, action) => {
      const userId = action.payload
      const updatedBlock = state.users.map((user) => {
        if (user.id == userId) {
          user.isBlocked = !user.isBlocked
        }
      })
    },

    updateRole: (state, action) => {
      const { userId, role } = action.payload
      const updatedRole = state.users.map((user) => {
        if (user.id == userId) {
          user.role = role
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
  addUser,
  editUser,
  login,
  logout
} = userSlice.actions

export default userSlice.reducer
