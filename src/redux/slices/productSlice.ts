import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../api/index'
import {
  CategoryOptionType,
  ProductInputType,
  ProductState,
  ProductType,
  UpdatedProductType
} from '../../types/productTypes'
import { CategoryType } from '../../types/categoryTypes'

const initialState: ProductState = {
  fetchedProducts: [],
  products: [],
  error: null,
  success: null,
  isLoading: false,
  product: null,
  productInput: null,
  chosenCategories: []
}

// user - fetch products, fetch product
export const fetchProductsData = createAsyncThunk(
  './product/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/products')

      return data.allProducts
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg)
    }
  }
)

export const fetchProductData = createAsyncThunk(
  './product/fetchProduct',
  async (_id: string | undefined, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`products/${_id}`)

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// admin - create product, update product, delete product
export const createProduct = createAsyncThunk(
  './product/createProduct',
  async (product: FormData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/products', product)

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg || error.response.data.errors[0])
    }
  }
)

export const updateProduct = createAsyncThunk(
  './product/updateProduct',
  async (updatedProduct: UpdatedProductType, { rejectWithValue }) => {
    try {
      const { _id, formData } = updatedProduct

      const { data } = await api.put(`/products/${_id}`, formData)

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg || error.response.data.errors[0])
    }
  }
)
export const deleteProduct = createAsyncThunk(
  './product/deleteProduct',
  async (_id: string | undefined, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`products/${_id}`)

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg)
    }
  }
)
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductMessage: (state) => {
      state.success = null
      state.error = null
    },
    getProductsByCategory: (state, action) => {
      const filterCategoriesIds = action.payload
      filterCategoriesIds.length
        ? (state.products = state.fetchedProducts.filter((product) => {
            let filteredCat = product.categories.some((categoryId) =>
              filterCategoriesIds.includes(categoryId)
            )
            return filteredCat
          }))
        : (state.products = state.fetchedProducts)
    },

    search: (state, action) => {
      const searchTerm = action.payload
      state.products = state.fetchedProducts.filter((product) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase())
      })
    },

    sortProducts: (state, action) => {
      const option = action.payload
      if (option == 1) {
        // sort by name a to z
        state.products.sort((a: ProductType, b: ProductType) => {
          return a.name.localeCompare(b.name)
        })
      } else if (option == -1) {
        // sort by name z to a
        state.products.sort((a: ProductType, b: ProductType) => {
          return b.name.localeCompare(a.name)
        })
      } else if (option == 2) {
        // sort by price low to high
        state.products.sort((a: ProductType, b: ProductType) => {
          return a.price - b.price
        })
      } else {
        // sort by price high to low
        state.products.sort((a: ProductType, b: ProductType) => {
          return b.price - a.price
        })
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // user - fetch products, fetch product
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.products = action.payload
        state.isLoading = false
      })

      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.product = action.payload.product
        const { _id, image, ...productInput } = action.payload.product

        // let options: CategoryOptionType[] = []
        // let option: CategoryOptionType
        // productInput.categories.map((category: CategoryType) => {
        //   option = { value: category._id + '', label: category.name }

        //   options = [...options, option]
        // })
        // state.chosenCategories = options
        // productInput.categories = options
        state.productInput = productInput
        state.isLoading = false
      })
      // admin - create product, update product, delete product
      .addCase(createProduct.fulfilled, (state, action) => {
        const { message, product } = action.payload
        state.products = [product, ...state.products]
        state.isLoading = false
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { message, updatedProduct } = action.payload

        const updatedProducts = state.products.map((product) => {
          if (product._id == updatedProduct._id) {
            return updatedProduct
          }
          return product
        })
        state.products = updatedProducts
        state.isLoading = false
        state.success = message
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const { message, _id } = action.payload
        state.products = state.products.filter((product) => product._id !== _id)
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
export const { clearProductMessage, getProductsByCategory, search, sortProducts } =
  productSlice.actions

export default productSlice.reducer
