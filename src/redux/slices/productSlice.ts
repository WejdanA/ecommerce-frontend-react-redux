import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import api from '../../api/index'

export type ProductType = {
  _id: string
  name: string
  image: string
  description: string
  price: number
  categories: string[]
  quantity: number
  sold: number
}

export type ProductState = {
  fetchedProducts: ProductType[]
  products: ProductType[]
  error: null | string
  isLoading: boolean
  product: ProductType | undefined | null
}

const initialState: ProductState = {
  fetchedProducts: [],
  products: [],
  error: null,
  isLoading: false,
  product: null
}

export const fetchProductsData = createAsyncThunk('./products/fetchProducts', async () => {
  const { data } = await api.get('/products')
  return data.allProducts
})

export const fetchProductData = createAsyncThunk('./products/fetchProduct', async (_id) => {
  console.log('_id in slice', _id)

  const { data } = await api.get(`products/${_id}`)

  return data.product
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },

    productsSuccess: (state, action) => {
      state.isLoading = false
      state.fetchedProducts = action.payload.allProducts
      state.products = action.payload.allProducts
    },

    addProduct: (state, action) => {
      const product = action.payload
      state.fetchedProducts = [product, ...state.fetchedProducts]
      state.products = state.fetchedProducts
    },

    editProduct: (state, action) => {
      const editedProduct = action.payload
      const updatedProducts = state.products.map((product) => {
        if (product._id == editedProduct._id) {
          return editedProduct
        }
        return product
      })
      state.fetchedProducts = updatedProducts
      state.products = state.fetchedProducts
    },

    removeProduct: (state, action) => {
      const productId = action.payload
      state.fetchedProducts = state.fetchedProducts.filter((product) => product._id !== productId)
      state.products = state.fetchedProducts
    },

    getProductById: (state, action) => {
      state.product = state.products.find((product) => product._id == action.payload)
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
      .addCase(fetchProductsData.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.isLoading = false
        state.error = 'Some Thing Went Wrong'
      })

      .addCase(fetchProductData.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.isLoading = false
        state.product = action.payload
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.isLoading = false
        state.error = 'Something Went Wrong'
      })
  }
})
export const {
  removeProduct,
  addProduct,
  editProduct,
  productsRequest,
  productsSuccess,
  getProductById,
  getProductsByCategory,
  search,
  sortProducts
} = productSlice.actions

export default productSlice.reducer
