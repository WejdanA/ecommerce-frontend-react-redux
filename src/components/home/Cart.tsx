import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { ChangeEvent, useEffect } from 'react'

import { ProductType } from '../../redux/slices/products/productSlice'
import { removeItem, editQuantity } from '../../redux/slices/cartSlice'

export const Cart = () => {
  const { items, isEmpty } = useSelector((state: RootState) => state.cartItems)
  const products = useSelector((state: RootState) => state.products.products)
  const dispatch = useDispatch()

  let product: ProductType | undefined
  const findItemDetails = (productId: number) => {
    product = products.find((product) => {
      return product.id == productId
    })

    return product
  }

  const quantityHandle = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('quantityedit')
    const itemProductId = e.target.id
    const quantity = e.target.value
    console.log(itemProductId)
    console.log(quantity)
    dispatch(editQuantity([itemProductId, quantity]))
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
      <button>place order</button>
    </div>
  )
}
