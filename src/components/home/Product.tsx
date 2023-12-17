import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { FaCartPlus, FaRegHeart, FaTag } from 'react-icons/fa6'

import { baseURL } from '../../api'
import { RootState } from '../../redux/store'
import { addItem } from '../../redux/slices/cartSlice'
import { fetchProductData, ProductType } from '../../redux/slices/productSlice'

export const Product = () => {
  const { _id } = useParams()
  const dispatch = useDispatch()

  const { product } = useSelector((state: RootState) => state.products)
  const { categories } = useSelector((state: RootState) => state.categories)

  useEffect(() => {
    console.log('id', _id)

    dispatch(fetchProductData(_id))
    console.log('product', product)
  }, [_id])

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((category) => category.id == categoryId)
    return category ? ' ' + category.name + '  ' : 'category not found'
  }

  //add to cart logic
  const addItemHandle = (productId: string) => {
    const id = productId + '' + new Date()
    const item = {
      id: id,
      productId: productId,
      quantity: 1
    }

    dispatch(addItem(item))
    notify()
  }

  const notify = () => toast.success('item was added to cart')

  return (
    <>
      <div className="main-content product-container">
        {product ? (
          <>
            <img
              src={baseURL + product.image}
              alt={`${product.name} image`}
              id="image"
              className="product-details"
            />
            <div className="product">
              <div id="id" className="product-details">
                {'#' + product._id}
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
              <p className="options">
                {product.quantity < 5 && product.quantity <= 0
                  ? 'out of stock'
                  : `only ${product.quantity} left in stock`}
              </p>

              <div className="buy">
                <div className="price">
                  {product.price}SAR <FaTag className="icon" />
                </div>
                <div className="buy-buttons">
                  <button
                    id={`${product._id}`}
                    className=" button product-btn"
                    onClick={() => addItemHandle(product._id)}>
                    <FaCartPlus className="icon" />
                  </button>
                  <button
                    id={`${product._id}`}
                    className=" button product-btn"
                    onClick={() => addItemHandle(product._id)}>
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
      <ToastContainer />
    </>
  )
}
