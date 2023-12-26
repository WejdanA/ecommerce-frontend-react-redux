import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../api'
import { CategoryState, CategoryType } from '../../types/categoryTypes'

const initialState: CategoryState = {
  categories: [],
  error: null,
  success: null,
  isLoading: false,
  category: {}
}

// user fetch categories fetch category
export const fetchCategories = createAsyncThunk(
  './category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/categories')

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg)
    }
  }
)

export const fetchCategory = createAsyncThunk(
  './category/fetchCategory',
  async (_id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/categories/${_id}`)

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// admin - create category, update category, delete category
export const createCategory = createAsyncThunk(
  './category/createCategory',
  async (name: string, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/categories/`, { name })

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg || error.response.data.errors[0])
    }
  }
)

export const updateCategory = createAsyncThunk(
  './category/updateCategory',
  async (updatedCategory: CategoryType, { rejectWithValue }) => {
    const { _id, name } = updatedCategory
    try {
      const { data } = await api.put(`/categories/${_id}`, { name })

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg || error.response.data.errors[0])
    }
  }
)

export const deleteCategory = createAsyncThunk(
  './category/deleteCategory',
  async (_id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/categories/${_id}`)

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }

      return rejectWithValue(error.response.data.msg)
    }
  }
)

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearCategoryMessage: (state) => {
      state.success = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // user - fetch categories, fetch category
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.allCategories
        state.isLoading = false
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.categories = action.payload.category
        state.isLoading = false
      })

      // admin - create category, update category, delete category
      .addCase(createCategory.fulfilled, (state, action) => {
        const { message, category } = action.payload
        state.categories = [category, ...state.categories]
        state.isLoading = false
        state.success = message
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const { message, updatedCategory } = action.payload

        const updatedCategories = state.categories.map((category) => {
          if (category._id == updatedCategory._id) {
            return updatedCategory
          }
          return category
        })
        state.categories = updatedCategories
        state.isLoading = false
        state.success = message
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const { message, _id } = action.payload
        state.categories = state.categories.filter((category) => category._id !== _id)
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
export const { clearCategoryMessage } = categorySlice.actions

export default categorySlice.reducer
