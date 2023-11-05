import { Link } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'
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
      <div className="main main-content">
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

        {products.isLoading && <h3> Loading products...</h3>}
        <div className="local-bootstrap">
          {' '}
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">price</th>
                <th scope="col">image</th>
                <th scope="col">Variants</th>
                <th scope="col">sizes</th>
                <th scope="col">operations</th>
              </tr>
            </thead>

            <tbody>
              {products.fetchedProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <img src={product.image} alt={product.name} width="50" />
                  </td>
                  <td>{product.variants.join(',')}</td>
                  <td>{product.sizes.join(',')}</td>
                  <Link to={`/admin/products/${product.id}`}>
                    <button className=" ">Edit</button>
                  </Link>
                  <button
                    className="hi"
                    onClick={() => {
                      dispatch(removeProduct(product.id))
                      dispatch(removeItem(product.id))
                    }}>
                    X
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
