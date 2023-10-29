import { createSlice } from '@reduxjs/toolkit'

export type UserType = {
  id: 1
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

export type UserState = {
  users: UserType[]
  blockedUsers: number[]
  error: null | string
  isLoading: boolean
  user: UserType | undefined | {}
}

const initialState: UserState = {
  users: [],
  blockedUsers: [0],
  error: null,
  isLoading: false,
  user: {}
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
      state.users = action.payload
    },
    addUser: (state, action) => {
      const user = action.payload
      state.users = [user, ...state.users]
    },
    editUser: (state, action) => {
      const user = action.payload
      const userId = user.id
      state.users = state.users.filter((user) => user.id !== userId)
      state.users = [user, ...state.users]
    },
    removeUser: (state, action) => {
      const userId = action.payload
      state.users = state.users.filter((user) => user.id !== userId)
    },
    getUserById: (state, action) => {
      state.user = state.users.find((user) => user.id == +action.payload)
    },
    blockUser: (state, action) => {
      const userId: number = +action.payload
      state.blockedUsers.push[userId]
      console.log(state.blockedUsers)
    },
    isBlocked: (state, action) => {}
  }
})
export const { removeUser, addUser, editUser, usersRequest, usersSuccess, getUserById, blockUser } =
  userSlice.actions

export default userSlice.reducer
