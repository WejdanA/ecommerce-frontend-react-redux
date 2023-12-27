import { createSlice } from '@reduxjs/toolkit'

export type ItemType = {
  id: number
  productId: string
  quantity: number
  price: number
}

export type ItemState = {
  items: ItemType[]
  itemsNo: number
  isEmpty: boolean
}

const initialState: ItemState = {
  items: [],
  itemsNo: 0,
  isEmpty: true
}

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newitem = action.payload
      const itemIndex = state.items.findIndex((item) => item.productId == newitem.productId)
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity++
      } else {
        state.items = [newitem, ...state.items]
        state.itemsNo = state.items.length
        state.isEmpty = false
      }
    },
    removeItem: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter((item) => item.productId !== productId)
      state.itemsNo = state.items.length
      state.items.length ? (state.isEmpty = false) : (state.isEmpty = true)
    },
    editQuantity: (state, action) => {
      const { itemProductId, quantity } = action.payload
      const itemIndex = state.items.findIndex((item) => item.productId == itemProductId)

      if (quantity != 0 && itemIndex != -1) {
        state.items[itemIndex].quantity = quantity
      } else {
        state.items = state.items.filter((item) => item.productId != itemProductId)
        state.itemsNo = state.items.length
      }
    },

    clearCart: (state) => {
      state.items = []
      state.itemsNo = 0
      state.isEmpty = true
    }
  }
})
export const { removeItem, addItem, editQuantity, clearCart } = itemSlice.actions

export default itemSlice.reducer
