import { useEffect, useState } from 'react'
import { FaCartPlus, FaRegHeart, FaTag } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { baseURL } from '../../api'
import { addItem } from '../../redux/slices/cartSlice'
import { fetchProductsData, updateQueryParams } from '../../redux/slices/productSlice'
import { AppDispatch, RootState } from '../../redux/store'

export function Products() {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, products, pagination, queryParams } = useSelector(
    (state: RootState) => state.products
  )

  let [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(4)

  useEffect(() => {
    dispatch(fetchProductsData(queryParams))
  }, [queryParams])

  //add to cart logic
  const addItemHandle = (productId: string, productPrice: number) => {
    const id = productId + '' + new Date()

    const item = {
      id: id,
      productId: productId,
      quantity: 1,
      price: productPrice
    }

    dispatch(addItem(item))
    notify()
  }
  const notify = () => toast.success('item was added to cart')

  let pagesBtn = []
  for (let i = 1; i <= pagination?.totalPages; i++) {
    pagesBtn.push(
      <button
        key={i}
        className={`round-button ${queryParams.currentPage == i ? 'active-page' : ''}`}
        onClick={() => {
          setCurrentPage(i)
          dispatch(updateQueryParams({ name: 'currentPage', value: i }))
        }}>
        {i}
      </button>
    )
  }

  const previousHandle = () => {
    dispatch(updateQueryParams({ name: 'currentPage', value: queryParams.currentPage - 1 }))
  }
  const nextHandle = () => {
    dispatch(updateQueryParams({ name: 'currentPage', value: queryParams.currentPage + 1 }))
  }

  return (
    <>
      <div id="products" className="products-container">
        {isLoading && <h3> Loading products...</h3>}

        {products?.length
          ? products.map((product) => (
              <div
                key={product._id}
                className={product.quantity <= 0 ? 'product out-of-stock' : 'product'}>
                <img
                  src={baseURL + product.image}
                  alt={product.name}
                  width="50"
                  className="product-img"
                />
                <div className="product-details">
                  <h2>{product.name}</h2>
                  <p className="description">{product.description}</p>
                  <div className="buy">
                    <div className="price">
                      {product.price}SAR <FaTag />
                    </div>

                    <div className="buy-buttons">
                      <button
                        id={`${product._id}`}
                        className=" button product-btn"
                        onClick={() => addItemHandle(product._id, product.price)}>
                        <FaCartPlus className="icon" />
                      </button>
                      <button id={`${product._id}`} className=" button product-btn">
                        <FaRegHeart className="icon" />
                      </button>
                    </div>
                  </div>
                  <p className="options">
                    {product.quantity < 5 && product.quantity <= 0
                      ? 'out of stock'
                      : `only ${product.quantity} left in stock`}
                  </p>
                  <Link to={`/product/${product._id}`}>
                    <button className="button product-btn more-btn">More Options</button>
                  </Link>
                </div>
              </div>
            ))
          : 'no matching results'}
      </div>
      <div className="pagination">
        <button onClick={previousHandle} disabled={queryParams.currentPage == 1}>
          previous
        </button>
        <>{pagesBtn}</>
        <button onClick={nextHandle} disabled={queryParams.currentPage == pagination.totalPages}>
          next
        </button>
      </div>
      <ToastContainer />
    </>
  )
}
