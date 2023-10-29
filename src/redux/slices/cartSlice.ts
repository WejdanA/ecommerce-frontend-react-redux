import { createSlice } from '@reduxjs/toolkit'

export type ItemType = {
  id: number
  productId: number
  quantity: number
}

export type ItemState = {
  items: ItemType[]
  itemsNo: number
  isEmpty: boolean
  item: ItemType | {} | undefined
}

const initialState: ItemState = {
  items: [],
  itemsNo: 0,
  isEmpty: true,
  item: {}
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
      const itemProductId = +action.payload[0]
      const quantity = action.payload[1]
      const itemIndex = state.items.findIndex((item) => item.productId == itemProductId)
      if (quantity != 0) {
        state.items[itemIndex].quantity = quantity
      } else {
        state.items = state.items.filter((item) => item.productId !== itemProductId)
        state.itemsNo = state.items.length
      }
    }
  }
})
export const { removeItem, addItem, editQuantity } = itemSlice.actions

export default itemSlice.reducer
