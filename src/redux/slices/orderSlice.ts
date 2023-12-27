import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api'
import { ProductType } from '../../types/productTypes'
import { UserType } from '../../types/userTypes'

export type PaymentType = {
  method: string
}
export type OrderType = {
  _id: string
  products: ProductType[]
  user: UserType
  status: string
  payment: PaymentType
}
export type CartItemsType = {
  product: string
  quantity: number
}

export type OrderInputType = {
  user: string | undefined
  products: CartItemsType[]
  payment: PaymentType
}

export type OrderState = {
  orders: OrderType[]
  userOrders: OrderType[]
  error: string | null
  success: string | null
  isLoading: boolean
}

const initialState: OrderState = {
  orders: [],
  userOrders: [],
  error: null,
  success: null,
  isLoading: false
}

//  user - fetch their own orders, place orders
export const fetchUserOrders = createAsyncThunk(
  './order/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/orders')

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg)
    }
  }
)

export const placeOrder = createAsyncThunk(
  './order/placeOrder',
  async (order: OrderInputType, { rejectWithValue }) => {
    // const neworder = JSON.stringify({
    //   products: [
    //     {
    //       product: '65891c49a0273cfa1100eb1e',
    //       quantity: 70
    //     },
    //     {
    //       product: '658750d6d769cfffaf6e544b',
    //       quantity: 1
    //     }
    //   ],
    //   payment: {
    //     method: 'credit-card'
    //   }
    // })

    // neworder, {
    //   headers: {
    //     // Overwrite Axios's automatically set Content-Type
    //     'Content-Type': 'application/json'
    //   }
    // }
    try {
      console.log('order', order)

      const { data } = await api.post(`/orders/process-payment`, order)

      return data
    } catch (error: any) {
      console.log('error', error)

      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg)
    }
  }
)
// admin - fetch all orders, update orders, delete order
export const fetchAllOrders = createAsyncThunk(
  './order/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/orders/all-orders')
      console.log('data', data)

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg)
    }
  }
)

export const updateOrder = createAsyncThunk(
  './order/updateOrder',
  async (_id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/orders/${_id}`)

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg)
    }
  }
)

export const deleteOrder = createAsyncThunk(
  './order/deleteOrder',
  async (_id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/orders/${_id}`)

      return data
    } catch (error: any) {
      if (!error.status && error.message === 'Network Error') {
        return rejectWithValue('Network Error')
      }
      return rejectWithValue(error.response.data.msg)
    }
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderMessage: (state) => {
      state.success = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // user - fetch thier own orders, place order
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload.allOrders
        state.isLoading = false
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        const { message, order } = action.payload
        state.orders = [order, ...state.orders]
        state.isLoading = false
        state.success = message
      })

      // admin - fetch all orders, update orders, delete order
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload.allOrders
        state.isLoading = false
      })

      .addCase(updateOrder.fulfilled, (state, action) => {
        const { message, updatedOrder } = action.payload

        const updatedOrders = state.orders.map((order) => {
          if (order._id == updatedOrder._id) {
            return updatedOrder
          }
          return order
        })
        state.orders = updatedOrders
        state.isLoading = false
        state.success = message
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const { message, _id } = action.payload
        state.orders = state.orders.filter((order) => order._id !== _id)
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
export const { clearOrderMessage } = orderSlice.actions

export default orderSlice.reducer
