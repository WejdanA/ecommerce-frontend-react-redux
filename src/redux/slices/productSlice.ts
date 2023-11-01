import { createSlice } from '@reduxjs/toolkit'

export type ProductType = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
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

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },

    productsSuccess: (state, action) => {
      state.isLoading = false
      state.fetchedProducts = action.payload
      state.products = action.payload
    },

    addProduct: (state, action) => {
      const product = action.payload
      state.fetchedProducts = [product, ...state.fetchedProducts]
      state.products = state.fetchedProducts
    },

    editProduct: (state, action) => {
      const editedProduct = action.payload
      const updatedProducts = state.products.map((product) => {
        if (product.id == editedProduct.id) {
          return editedProduct
        }
        return product
      })
      state.fetchedProducts = updatedProducts
      state.products = state.fetchedProducts
    },

    removeProduct: (state, action) => {
      const productId = action.payload
      state.fetchedProducts = state.fetchedProducts.filter((product) => product.id !== productId)
      state.products = state.fetchedProducts
    },

    getProductById: (state, action) => {
      state.product = state.products.find((product) => product.id == +action.payload)
    },

    getProductsByCategory: (state, action) => {
      const filterCategories = action.payload
      filterCategories.length
        ? (state.products = state.fetchedProducts.filter((product) => {
            let filteredCat = product.categories.some((category) =>
              filterCategories.includes(category)
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
    }
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

  search
} = productSlice.actions

export default productSlice.reducer
