import { useSelector } from 'react-redux'

import { RootState } from '../../../redux/store'

import { Admin } from '../Admin'
import { Orders } from './Orders'

export function OrdersManager() {
  const { orders, isLoading } = useSelector((state: RootState) => state.orders)

  return (
    <div className="main-content">
      <Admin />
      <Orders orders={orders} />
    </div>
  )
}
