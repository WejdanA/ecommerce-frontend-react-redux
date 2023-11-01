import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../../redux/store'
import { removeItem } from '../../../redux/slices/cartSlice'
import { removeProduct } from '../../../redux/slices/productSlice'

import { Admin } from '../Admin'
import { NewProductWrapper } from './NewProductWrapper'

export function ProductsManager() {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.products)

  return (
    <div className="main-content">
      <Admin />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full main main-content">
        <NewProductWrapper />
        {products.isLoading && <h3> Loading products...</h3>}
        <div className="card grid gap-4">
          <ul>
            {products.fetchedProducts.map((product) => (
              <li key={product.id} className="flex items-center gap-4 text-2xl mb-2">
                <img src={product.image} alt={product.name} width="50" />
                <span>{product.name}</span>
                <Link to={`/admin/products/${product.id}`}>
                  <button className=" text-red-400 text-xs">Edit</button>
                </Link>

                <button
                  className=" text-red-400 text-xs"
                  onClick={() => {
                    dispatch(removeProduct(product.id))
                    dispatch(removeItem(product.id))
                  }}>
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
