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

  const addOrderHandle = () => {
    console.log('inside add order')
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
      <h1>Cart Items </h1>
      {isEmpty && <h1>The cart is empty</h1>}
      {items.map((item) => (
        <div key={item.id}>
          {findItemDetails(item.productId).id}
          <div>
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} width="50" className="product-img" />
          </div>
          <input
            type="number"
            name="quantity"
            id={`${item.productId}`}
            value={item.quantity}
            onChange={quantityHandle}
          />
          <button id={`${item.productId}`} onClick={() => dispatch(removeItem(item.productId))}>
            remove
          </button>
        </div>
      ))}
      {isLogin ? (
        <button onClick={() => addOrderHandle()}>place order</button>
      ) : (
        <Link to="/login">
          <button>please log in to complete your order</button>
        </Link>
      )}
    </div>
  )
}
