import { createSlice } from '@reduxjs/toolkit'

export type OrderType = {
  id: number
  productId: number
  price: number
  userId: number
  purchasedAt: Date
}

export type OrderState = {
  orders: OrderType[]
  userOrders: OrderType[]
  error: string | null
  isLoading: boolean
}

const initialState: OrderState = {
  orders: [],
  userOrders: [],
  error: null,
  isLoading: false
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
    addOrder: (state, action) => {
      state.orders = [...action.payload, ...state.orders]
    },
    getOrdersByUser: (state, action) => {
      const userId = action.payload
      state.userOrders = state.orders.filter((order) => order.userId == userId)
    }
  }
})
export const { ordersRequest, ordersSuccess, addOrder, getOrdersByUser } = orderSlice.actions

export default orderSlice.reducer
