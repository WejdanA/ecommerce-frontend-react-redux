import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaCartPlus, FaRegHeart, FaTag } from 'react-icons/fa6'

import { addItem } from '../../redux/slices/cartSlice'
import { AppDispatch, RootState } from '../../redux/store'

export function Products() {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.products)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(4)

  //add to cart logic
  const addItemHandle = (productId: number, productPrice: number) => {
    const id = productId + '' + new Date()

    const item = {
      id: id,
      productId: productId,
      quantity: 1,
      price: productPrice
    }

    dispatch(addItem(item))
  }

  // pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfirstItem = indexOfLastItem - itemsPerPage
  const currentitems = products.products.slice(indexOfirstItem, indexOfLastItem)
  const totalpages = Math.ceil(products.products.length / itemsPerPage)
  let pagesBtn = []
  for (let i = 1; i <= totalpages; i++) {
    pagesBtn.push(
      <button
        key={i}
        className={`round-button ${currentPage == i ? 'active-page' : ''}`}
        onClick={() => {
          setCurrentPage(i)
        }}>
        {i}
      </button>
    )
  }

  const previousHandle = () => {
    setCurrentPage(currentPage - 1)
  }
  const nextHandle = () => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <>
      <div id="products" className="products-container">
        {products.isLoading && <h3> Loading products...</h3>}

        {currentitems.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.name} width="50" className="product-img" />
            <div className="product-details">
              <h2>{product.name}</h2>
              <p className="description">{product.description}</p>
              <div className="buy">
                <div className="price">
                  {product.price}SAR <FaTag />
                </div>

                <div className="buy-buttons">
                  <button
                    id={`${product.id}`}
                    className=" button product-btn"
                    onClick={() => addItemHandle(product.id, product.price)}>
                    <FaCartPlus className="icon" />
                  </button>
                  <button id={`${product.id}`} className=" button product-btn">
                    <FaRegHeart className="icon" />
                  </button>
                </div>
              </div>
              <p className="options">
                {product.sizes[0]}
                {product.sizes[0] && ', '}
                {product.variants[0]}
              </p>

              <Link to={`/product/${product.id}`}>
                <button className="button product-btn more-btn">More Options</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={previousHandle} disabled={currentPage == 1}>
          previous
        </button>
        <>{pagesBtn}</>
        <button onClick={nextHandle} disabled={currentPage == totalpages}>
          next
        </button>
      </div>
    </>
  )
}
