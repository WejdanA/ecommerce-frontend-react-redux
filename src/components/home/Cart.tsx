import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { baseURL } from '../../api'
import { clearCart, editQuantity, removeItem } from '../../redux/slices/cartSlice'
import { CartItemsType, OrderInputType, placeOrder } from '../../redux/slices/orderSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { ProductType } from '../../types/productTypes'

export const Cart = () => {
  const navigate = useNavigate()
  const { items, isEmpty } = useSelector((state: RootState) => state.cartItems)
  const products = useSelector((state: RootState) => state.products.products)
  const { isLogin, loginUser } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()

  let product: ProductType | undefined
  const findItemDetails = (productId: string) => {
    product = products.find((product) => {
      return product._id == productId
    })

    return product
  }

  const quantityHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { id: itemProductId, value: quantity } = e.target

    dispatch(editQuantity({ itemProductId, quantity }))
  }
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const addOrderHandle = () => {
    let products: CartItemsType[] = []
    items.map((item) => {
      products.push({
        product: item.productId,
        quantity: item.quantity
      })
    })

    const order: OrderInputType = {
      products,
      user: loginUser?._id,
      payment: {
        method: 'credit-card'
      }
    }
    console.log('orders before', order)
    dispatch(placeOrder(order))

    dispatch(clearCart())
    navigate('/user/profile')
  }
  console.log('items', items)

  return (
    <div id="cart" className="cart main-content">
      {isEmpty ? (
        <h1>The cart is empty</h1>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">{findItemDetails(item.productId)?._id} </div>
              <div>
                <img
                  src={baseURL + product?.image}
                  alt={product?.name}
                  width="50"
                  className="product-img"
                />
              </div>
              <Link to={`/product/${product?._id}`}>
                <h1 className="cart-item-details">{product?.name}</h1>
              </Link>
              <input
                type="number"
                name="quantity"
                id={`${item.productId}`}
                className="cart-item-details"
                value={item.quantity}
                onChange={quantityHandle}
              />
              <div className="cart-item-details">{Number(product?.price) * item.quantity} </div>
              <button
                id={`${item.productId}`}
                className="cart-item-details remove-btn"
                onClick={() => dispatch(removeItem(item.productId))}>
                x
              </button>
            </div>
          ))}
          <div className="total-price">total amount: {getTotalPrice()} SAR</div>

          {isLogin ? (
            <button className="order-btn" onClick={addOrderHandle}>
              place order
            </button>
          ) : (
            <Link to="/login">
              <button className="order-btn">please log in to complete your order</button>
            </Link>
          )}
        </>
      )}
    </div>
  )
}
