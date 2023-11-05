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
      <div className="local-bootstrap">
        <table className="table table-stripe">
          <thead className="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">product id</th>
              <th scope="col">product</th>
              <th scope="col">user id</th>
              <th scope="col">user </th>
              <th scope="col">purchased At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="flex items-center gap-4 text-2xl mb-2">
                <td>{order.id}</td>
                <td>{order.productId}</td>
                <td>{getProductName(order.productId)}</td>
                <td>{order.userId}</td>
                <td>{getUserName(order.userId)}</td>
                <td>{order.purchasedAt + ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
