import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import api from '../api'
import { AppDispatch, RootState } from '../redux/store'
import { productsRequest, productsSuccess } from '../redux/slices/productSlice'
import { categoriesRequest, categoriesSuccess } from '../redux/slices/categorySlice'
import { usersRequest, usersSuccess } from '../redux/slices/userSlice'
import { ordersRequest, ordersSuccess } from '../redux/slices/orderSlice'
export const FetchData = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handleGetProducts = async () => {
    dispatch(productsRequest())
    const res = await api.get('/mock/e-commerce/products.json')
    dispatch(productsSuccess(res.data))
  }

  const handleGetCategories = async () => {
    dispatch(categoriesRequest())
    const res = await api.get('/mock/e-commerce/categories.json')
    dispatch(categoriesSuccess(res.data))
  }
  const handleGetOrders = async () => {
    dispatch(ordersRequest())
    const res = await api.get('/mock/e-commerce/orders.json')
    dispatch(ordersSuccess(res.data))
  }

  const handleGetUsers = async () => {
    dispatch(usersRequest())
    const res = await api.get('/mock/e-commerce/users.json')
    dispatch(usersSuccess(res.data))
  }

  useEffect(() => {
    handleGetProducts()
    handleGetCategories()
    handleGetUsers()
    handleGetOrders()
  }, [])

  return <div></div>
}
