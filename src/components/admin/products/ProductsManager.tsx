import { useEffect } from 'react'
import { Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { baseURL } from '../../../api'
import {
  clearProductMessage,
  deleteProduct,
  fetchProductsData
} from '../../../redux/slices/productSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { Messages } from '../../../utils/Messages'
import { Admin } from '../Admin'
import { NewProductWrapper } from './NewProductWrapper'

export function ProductsManager() {
  const { products, isLoading, error, success } = useSelector((state: RootState) => state.products)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProductsData())
  }, [dispatch])

  return (
    <div className="main-content">
      <Admin />
      <div className="">
        <div className="local-bootstrap">
          <Accordion className="admin-form">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Add New product </Accordion.Header>
              <Accordion.Body>
                <NewProductWrapper />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>

        {isLoading ? (
          <h3> Loading products...</h3>
        ) : (
          <div className="local-bootstrap">
            {products?.length ? (
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">price</th>
                    <th scope="col">image</th>
                    <th scope="col">quantity</th>
                    <th scope="col">sold</th>
                    <th scope="col">categories</th>
                    <th scope="col">operations</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>
                        <img src={baseURL + product.image} alt={product.name} width="50" />
                      </td>
                      <td>{product.quantity}</td>
                      <td>{product.sold}</td>
                      <td>
                        {product.categories &&
                          product.categories.map((category) => (
                            <span key={category._id} id="category">
                              {category.name + ' '}
                            </span>
                          ))}
                      </td>

                      <td>
                        <Link to={`/admin/products/${product._id}`}>
                          <button className="edit-btn">Edit</button>
                        </Link>
                        <button
                          className="remove-btn"
                          onClick={() => {
                            dispatch(deleteProduct(product._id))
                          }}>
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h3> No Products Were Found</h3>
            )}
          </div>
        )}
      </div>
      <Messages error={error} success={success} clearMessage={clearProductMessage} />
    </div>
  )
}
