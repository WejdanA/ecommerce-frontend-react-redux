import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { addItem } from '../../redux/slices/cartSlice'
import { AppDispatch, RootState } from '../../redux/store'

export function Products() {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.products)

  const addItemHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const productId = +e.target.id

    const id = productId + '' + new Date()

    const item = {
      id: id,
      productId: productId,
      quantity: 1
    }

    dispatch(addItem(item))
  }

  return (
    <div id="products" className="products-container">
      {products.isLoading && <h3> Loading products...</h3>}

      {products.products.map((product) => (
        <div key={product.id} className="product">
          <img src={product.image} alt={product.name} width="50" className="product-img" />
          <h2>{product.name}</h2>
          <button id={`${product.id}`} className=" button product-btn" onClick={addItemHandle}>
            Add to the Cart
          </button>
          <Link to={`/products/product/${product.id}`}>
            <button className=" button product-btn">More Details</button>
          </Link>
        </div>
      ))}
    </div>
  )
}
