import { Link } from 'react-router-dom'
import { OrderType } from '../../../redux/slices/orderSlice'

type OrdersPropsType = {
  orders: OrderType[]
}

export function Orders({ orders }: OrdersPropsType) {
  // const getProductName = (orderProducts: []) => {
  //   const product = products.find((product) => product._id == productId)
  //   return product ? product.name : 'product was not found'
  // }

  return (
    <div className="main-content">
      <div className="local-bootstrap">
        <table className="table table-stripe">
          <thead className="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">details</th>
              <th scope="col">user id</th>
              <th scope="col">user </th>
              <th scope="col">order status </th>
            </tr>
          </thead>
          <tbody>
            {orders
              ? orders.map((order) => (
                  <tr key={order._id} className="flex items-center gap-4 text-2xl mb-2">
                    <td>{order._id}</td>
                    <td>
                      <Link to="/order-details">details</Link>
                    </td>

                    <td>{order.user._id}</td>
                    <td>{order.user.firstName}</td>
                    <td>{order.status}</td>
                  </tr>
                ))
              : 'orders not found'}
          </tbody>
        </table>
      </div>
    </div>
  )
}
