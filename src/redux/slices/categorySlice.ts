import { createSlice } from '@reduxjs/toolkit'
import { ProductType } from './products/productSlice'

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
    removeCategory: (state, action) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload)
    },
    editProduct: (state, action) => {
      const category = action.payload
      const categoryId = category.id
      state.categories = state.categories.filter((category) => category.id !== categoryId)
      state.categories = [category, ...state.categories]
    }

    // getProductById: (state, action) => {
    //   state.product = state.products.find((product) => product.id == action.payload)
    //   console.log(state.products)
    // },
  }
})
export const { categoriesRequest, categoriesSuccess, addCategory, removeCategory } =
  categorySlice.actions

export default categorySlice.reducer
