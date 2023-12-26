import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../api'
import {
  BannedInfoType,
  LoginType,
  ResetPasswordType,
  RoleInfoType,
  UserState,
  UserType
} from '../../types/userTypes'

const initialState: UserState = {
  users: [],
  error: null,
  success: null,
  isLoading: false,
  isLogin: false,
  loginUser: null
}

export const fetchUserData = createAsyncThunk('./user/fetchUser', async () => {
  const { data } = await api.get(`users/profile`)

  return data.user
})

// auth - login, logout, forget and reset password
export const login = createAsyncThunk(
  './auth/login',
  async (loginInfo: LoginType, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/login', loginInfo)

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg || error.response.data.errors[0])
    }
  }
)

export const logout = createAsyncThunk('./auth/logout', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/logout')

    return data
  } catch (error: any) {
    if (!error.status && error.message === 'Network Error') {
      return rejectWithValue('Network Error')
    }
    return rejectWithValue(error.response.data.msg)
  }
})
export const forgetPassword = createAsyncThunk(
  './user/forgetPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/forget-password', { email })

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg || error.response.data.errors[0])
    }
  }
)
export const resetPassword = createAsyncThunk(
  './user/resetPassword',
  async (resetPasswordInfo: ResetPasswordType, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/reset-password', resetPasswordInfo)

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg || error.response.data.errors[0])
    }
  }
)
// user - register, activate, fetch profile, update profile
export const register = createAsyncThunk(
  './user/register',
  async (user: Partial<UserType>, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/register', user)

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg || error.response.data.errors[0])
    }
  }
)

export const activate = createAsyncThunk(
  './user/activate',
  async (token: string | null, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/activate', { token })

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg || error.response.data.errors[0])
    }
  }
)
export const fetchProfile = createAsyncThunk('./user/profile', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/users/fetchProfile')

    return data
  } catch (error: any) {
    if (!error.status && error.message === 'Network Error') {
      return rejectWithValue('Network Error')
    }
    return rejectWithValue(error.response.data.msg)
  }
})

export const updateProfile = createAsyncThunk(
  './user/updateProfile',
  async (user: Partial<UserType>, { rejectWithValue }) => {
    try {
      const { data } = await api.put('/users/profile', user)

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg || error.response.data.errors[0])
    }
  }
)
// admin - fetch users, ban/unban, user to admin, admin to user, delete
export const fetchUsersData = createAsyncThunk(
  './users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/users')
      return data.allUsers
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }

      return rejectWithValue(error.response.data.msg)
    }
  }
)

export const updateUserBanning = createAsyncThunk(
  './users/updateBanning',
  async (bannedInfo: BannedInfoType, { rejectWithValue }) => {
    try {
      const { _id, isBanned } = bannedInfo
      const { data } = isBanned
        ? await api.put(`/users/unban/${_id}`)
        : await api.put(`/users/ban/${_id}`)
      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }

      return rejectWithValue(error.response.data.msg)
    }
  }
)

export const updateUserRole = createAsyncThunk(
  './users/updateRole',
  async (rolleInfo: RoleInfoType, { rejectWithValue }) => {
    try {
      const { _id, isAdmin } = rolleInfo

      const { data } = isAdmin
        ? await api.put(`/users/notadmin/${_id}`)
        : await api.put(`/users/admin/${_id}`)

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg)
    }
  }
)

export const deleteUser = createAsyncThunk(
  './users/deleteUser',
  async (_id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/users/${_id}`)

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }

      return rejectWithValue(error.response.data.msg)
    }
  }
)
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserMessage: (state) => {
      state.success = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false
        state.loginUser = action.payload
      })
      // auth - login, logout, forget and reset password
      .addCase(login.fulfilled, (state, action) => {
        const { message, user } = action.payload
        state.isLogin = true
        state.loginUser = user

        state.isLoading = false
        state.success = message
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLogin = false
        state.loginUser = null
        state.isLoading = false
        state.success = action.payload.message
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.success = action.payload.message
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.success = action.payload.message
      })
      // user - register, activate, fetch profile, update profile
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.success = action.payload.message
      })
      .addCase(activate.fulfilled, (state, action) => {
        const { message, user } = action.payload
        state.users = [user, ...state.users]
        state.isLoading = false
        state.success = message
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        const { message, user } = action.payload
        state.loginUser = user
        state.isLoading = false
        state.success = message
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const { message, user } = action.payload
        state.loginUser = user
        state.isLoading = false
        state.success = message
      })
      // admin - fetch users, ban/unban, user to admin, admin to user, delete
      .addCase(fetchUsersData.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(updateUserBanning.fulfilled, (state, action) => {
        const { message, _id } = action.payload
        const updatedBanning = state.users.map((user) => {
          if (user._id == _id) {
            user.isBanned = !user.isBanned
          }
        })
        state.isLoading = false
        state.success = message
      })

      .addCase(updateUserRole.fulfilled, (state, action) => {
        const { message, _id } = action.payload
        const updatedRole = state.users.map((user) => {
          if (user._id == _id) {
            user.isAdmin = !user.isAdmin
          }
        })
        state.isLoading = false
        state.success = message
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const { message, _id } = action.payload
        state.users = state.users.filter((user) => user._id !== _id)
        state.isLoading = false
        state.success = message
      })

      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload
        }
      )
  }
})
export const { clearUserMessage } = userSlice.actions

export default userSlice.reducer
