import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import api from '../api'
import { AppDispatch, RootState } from '../redux/store'
import { productsRequest, productsSuccess } from '../redux/slices/productSlice'
import { categoriesRequest, categoriesSuccess } from '../redux/slices/categorySlice'
import { ordersRequest, ordersSuccess } from '../redux/slices/orderSlice'
export const FetchData = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handleGetProducts = async () => {
    dispatch(productsRequest())
    const res = await api.get('/products')
    dispatch(productsSuccess(res.data))
    console.log('products in products manger', res.data)
  }

  const handleGetCategories = async () => {
    dispatch(categoriesRequest())
    const res = await api.get('/categories')
    dispatch(categoriesSuccess(res.data))
  }
  const handleGetOrders = async () => {
    dispatch(ordersRequest())
    const res = await api.get('/orders')
    dispatch(ordersSuccess(res.data))
  }

  useEffect(() => {
    handleGetProducts()
    // handleGetCategories()

    // handleGetOrders()
  }, [])

  return <div></div>
}
