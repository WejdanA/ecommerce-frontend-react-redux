import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../api'

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

export const fetchUsersData = createAsyncThunk('./users/fetchUsers', async () => {
  const { data } = await api.get('/users')
  return data.allUsers
})

export const fetchUserData = createAsyncThunk('./user/fetchUser', async () => {
  const { data } = await api.get(`users/profile`)

  return data.user
})

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

    login: (state, action) => {
      state.isLogin = true
      state.loginUser = action.payload
    },
    logout: (state) => {
      state.isLogin = false
      state.loginUser = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersData.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchUsersData.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(fetchUsersData.rejected, (state, action) => {
        state.isLoading = false
        state.error = 'Some Thing Went Wrong'
      })

      .addCase(fetchUserData.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false
        state.loginUser = action.payload
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false
        state.error = 'Something Went Wrong'
      })
  }
})
export const { usersRequest, usersSuccess, login, logout } = userSlice.actions

export default userSlice.reducer
