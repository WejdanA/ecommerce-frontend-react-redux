import { createSlice } from '@reduxjs/toolkit'
import { ProductType } from './productSlice'

export type CategoryType = {
  id: number
  name: string
}

export type CategoryState = {
  categories: CategoryType[]
  error: null | string
  isLoading: boolean
  category: CategoryType | {} | undefined
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false,
  category: {}
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categoriesRequest: (state) => {
      state.isLoading = true
    },
    categoriesSuccess: (state, action) => {
      state.isLoading = false
      state.categories = action.payload
    },
    addCategory: (state, action) => {
      state.categories = [action.payload, ...state.categories]
    },

    editCategory: (state, action) => {
      const editedCategory = action.payload
      const updatedCategories = state.categories.map((category) => {
        if (category.id == editedCategory.id) {
          return editedCategory
        }
        return category
      })
      state.categories = updatedCategories
    },

    removeCategory: (state, action) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload)
    }
  }
})
export const { categoriesRequest, categoriesSuccess, addCategory, editCategory, removeCategory } =
  categorySlice.actions

export default categorySlice.reducer
