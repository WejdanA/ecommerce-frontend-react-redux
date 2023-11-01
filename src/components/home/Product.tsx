import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../redux/store'
import { getProductById, ProductType } from '../../redux/slices/productSlice'

export const Product = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const product: ProductType = useSelector((state: RootState) => state.products.product)
  const { categories } = useSelector((state: RootState) => state.categories)

  useEffect(() => {
    dispatch(getProductById(id))
  }, [id])

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((category) => category.id == categoryId)
    return category ? ' ' + category.name + '  ' : 'category not found'
  }

  return (
    <>
      <div className="main-content product-container">
        {product ? (
          <div className="product center">
            <div id="id" className="product-details">
              {'#' + product.id}
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
            <div id="categories">
              categories:
              {product.categories &&
                product.categories.map((categoryId) => (
                  <span key={categoryId} id="category">
                    {getCategoryName(categoryId)}
                  </span>
                ))}
            </div>

            <div id="id" className="product-details">
              description: {product.description}
            </div>

            <div id="variants">
              variants:
              <select name="variants" id="">
                {product.variants && product.variants.length ? (
                  product.variants.map((variant) => (
                    <option key={variant} value={variant}>
                      {variant}
                    </option>
                  ))
                ) : (
                  <option value="one variant">one variant</option>
                )}
              </select>
            </div>

            <div id="sizes">
              sizes:
              <select name="sizes" id="">
                {product.sizes && product.sizes.length ? (
                  product.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))
                ) : (
                  <option value="one size">one size</option>
                )}
              </select>
            </div>
          </div>
        ) : (
          <div className="not-found">Product Not Found</div>
        )}
      </div>
    </>
  )
}
