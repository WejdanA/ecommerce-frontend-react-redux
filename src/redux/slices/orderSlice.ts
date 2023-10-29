import { createSlice } from '@reduxjs/toolkit'

export type Order = {
  id: number
  productId: number
  userId: number
  purchasedAt: Date
}
export type CartItem = {
  productId: number
  userId: number
  purchasedAt: Date
}

export type OrderState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
  order: Order | {} | undefined
  cartItem: string[]
}

const initialState: OrderState = {
  orders: [],
  error: null,
  isLoading: false,
  order: {},
  cartItem: []
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    ordersRequest: (state) => {
      state.isLoading = true
    },
    ordersSuccess: (state, action) => {
      state.isLoading = false
      state.orders = action.payload
    },
    addOrder: (state, action: { payload: { order: Order } }) => {
      state.orders = [action.payload.order, ...state.orders]
    }
    // removeProduct: (state, action: { payload: { productId: number } }) => {
    //   const filteredItems = state.products.filter(
    //     (product) => product.id !== action.payload.productId
    //   )
    //   state.products = filteredItems
    // },
    // getProductById: (state, action) => {
    //   state.product = state.products.find((product) => product.id == action.payload)
    //   console.log(state.products)
    // },
  }
})
export const { ordersRequest, ordersSuccess } = orderSlice.actions

export default orderSlice.reducer
