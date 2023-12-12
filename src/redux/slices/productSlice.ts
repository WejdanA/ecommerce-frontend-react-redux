import { createSlice } from '@reduxjs/toolkit'

export type ProductType = {
  id: number
  name: string
  image: string
  description: string
  price: number
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
