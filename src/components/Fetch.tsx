import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import api from '../api'
import { AppDispatch, RootState } from '../redux/store'
import { productsRequest, productsSuccess } from '../redux/slices/products/productSlice'
import { categoriesRequest, categoriesSuccess } from '../redux/slices/categorySlice'
import { usersRequest, usersSuccess } from '../redux/slices/userSlice'
export const Fetch = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    handleGetProducts()
  }, [])

  const handleGetProducts = async () => {
    dispatch(productsRequest())
    const res = await api.get('/mock/e-commerce/products.json')
    dispatch(productsSuccess(res.data))
  }

  useEffect(() => {
    handleGetCategories()
  }, [])

  const handleGetCategories = async () => {
    dispatch(categoriesRequest())
    const res = await api.get('/mock/e-commerce/categories.json')
    dispatch(categoriesSuccess(res.data))
  }

  useEffect(() => {
    handleGetUsers()
  }, [])

  const handleGetUsers = async () => {
    dispatch(usersRequest())
    const res = await api.get('/mock/e-commerce/users.json')
    dispatch(usersSuccess(res.data))
  }

  return <div></div>
}
