import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../redux/store'
import { ProductType } from '../../redux/slices/productSlice'
import { removeItem, editQuantity, clearCart } from '../../redux/slices/cartSlice'
import { Link } from 'react-router-dom'
import { addOrder } from '../../redux/slices/orderSlice'

export const Cart = () => {
  const navigate = useNavigate()
  const { items, isEmpty } = useSelector((state: RootState) => state.cartItems)
  const products = useSelector((state: RootState) => state.products.products)
  const { isLogin, loginUser } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch()
  // const [totalPrice, setTotalPrice] = useState(0)

  let product: ProductType | undefined
  const findItemDetails = (productId: number) => {
    product = products.find((product) => {
      return product.id == productId
    })

    return product
  }

  const quantityHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { id: itemProductId, value: quantity } = e.target

    dispatch(editQuantity({ itemProductId, quantity }))
  }
  const getTotalPrice = () => {
    let totalPrice = 0
    items.map((item) => (totalPrice += item.price * item.quantity))
    return totalPrice
  }

  const addOrderHandle = () => {
    items.map((item) =>
      dispatch(
        addOrder({
          id: +new Date(),
          productId: item.productId,
          userId: loginUser?.id,
          purchasedAt: new Date()
        })
      )
    )
    dispatch(clearCart())
    navigate('/user/profile')
  }

  return (
    <div id="cart" className="cart main-content">
      {isEmpty ? (
        <h1>The cart is empty</h1>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">{findItemDetails(item.productId)?.id} </div>
              <div>
                <img src={product?.image} alt={product?.name} width="50" className="product-img" />
              </div>
              <Link to={`/product/${product?.id}`}>
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
            <button className="order-btn" onClick={() => addOrderHandle()}>
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
