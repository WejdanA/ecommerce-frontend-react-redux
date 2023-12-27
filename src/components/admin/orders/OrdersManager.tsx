import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../../redux/store'

import { Admin } from '../Admin'
import { Orders } from './Orders'
import { clearOrderMessage, fetchAllOrders } from '../../../redux/slices/orderSlice'
import { useEffect } from 'react'
import { Messages } from '../../../utils/Messages'

export function OrdersManager() {
  const { isLoading, success, error, orders } = useSelector((state: RootState) => state.orders)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchAllOrders())
    console.log(orders)
  }, [dispatch])

  return (
    <div className="main-content">
      <Admin />
      <Orders orders={orders} />
      <Messages error={error} success={success} clearMessage={clearOrderMessage} />
    </div>
  )
}
