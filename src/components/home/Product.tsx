import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaCartPlus, FaRegHeart, FaTag } from 'react-icons/fa6'

import { RootState } from '../../redux/store'
import { addItem } from '../../redux/slices/cartSlice'
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

  //add to cart logic
  const addItemHandle = (productId: number) => {
    const id = productId + '' + new Date()
    const item = {
      id: id,
      productId: productId,
      quantity: 1
    }

    dispatch(addItem(item))
  }

  return (
    <>
      <div className="main-content product-container">
        {product ? (
          <>
            <img
              src={product.image}
              alt={`${product.name} image`}
              id="image"
              className="product-details"
            />
            <div className="product">
              <div id="id" className="product-details">
                {'#' + product.id}
              </div>
              <div id="name" className="product-details">
                {product.name}
              </div>

              <div id="categories" className="product-details">
                categories:
                {product.categories &&
                  product.categories.map((categoryId) => (
                    <span key={categoryId} id="category">
                      {getCategoryName(categoryId)}
                    </span>
                  ))}
              </div>

              <div id="description" className="product-details">
                {product.description}
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

              <div className="buy">
                <div className="price">
                  {product.price}SAR <FaTag className="icon" />
                </div>
                <div className="buy-buttons">
                  <button
                    id={`${product.id}`}
                    className=" button product-btn"
                    onClick={() => addItemHandle(product.id)}>
                    <FaCartPlus className="icon" />
                  </button>
                  <button
                    id={`${product.id}`}
                    className=" button product-btn"
                    onClick={() => addItemHandle(product.id)}>
                    <FaRegHeart className="icon" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="not-found">Product Not Found</div>
        )}
      </div>
    </>
  )
}
