import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getProductById, ProductType } from '../../redux/slices/products/productSlice'
import { RootState } from '../../redux/store'

export const Product = () => {
  const product: ProductType = useSelector((state: RootState) => state.products.product)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getProductById(id))
  }, [id])

  return (
    <>
      {product ? (
        <div className="main-content">
          <div id="id" className="product-details">
            {product.id}
          </div>
          <div id="name" className="product-details">
            {product.name}
          </div>
          <img
            src={product.image}
            alt={`${product.name} image`}
            id="image "
            className="product-details"
          />
          <div id="id" className="product-details">
            {product.categories}
          </div>
          <div id="id" className="product-details">
            {product.description}
          </div>
        </div>
      ) : (
        <div>Product Not Found</div>
      )}
    </>
  )
}
