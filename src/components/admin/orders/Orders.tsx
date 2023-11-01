import { useSelector } from 'react-redux'

import { RootState } from '../../../redux/store'

import { OrderType } from '../../../redux/slices/orderSlice'

type OrdersPropsType = {
  orders: OrderType[]
}

export function Orders({ orders }: OrdersPropsType) {
  const { users } = useSelector((state: RootState) => state.users)
  const { products } = useSelector((state: RootState) => state.products)

  const getProductName = (productId: number) => {
    const product = products.find((product) => product.id == productId)
    return product ? product.name : 'product was not found'
  }

  const getUserName = (userId: number) => {
    const user = users.find((user) => user.id == userId)
    return user ? user.firstName + ', ' + user.lastName : 'product was not found'
  }

  return (
    <div className="main-content">
      <div id="products" className="products-container">
        <div className="card grid gap-4">
          <ul>
            {orders.map((order) => (
              <li key={order.id} className="flex items-center gap-4 text-2xl mb-2">
                <span>{order.productId}</span>
                <span>{getProductName(order.productId)}</span>
                <span>{order.userId}</span>
                <span>{getUserName(order.userId)}</span>
                <span>{order.purchasedAt + ''}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
