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
          <p>{product.description}</p>
          <span>{product.sizes[0]}</span>
          <span> {product.variants[0]}</span>
          <button id={`${product.id}`} className=" button product-btn" onClick={addItemHandle}>
            Add to the Cart
          </button>
          <Link to={`/product/${product.id}`}>
            <button className="button product-btn">More Options</button>
          </Link>
        </div>
      ))}
    </div>
  )
}
