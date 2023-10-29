import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import App from '../../App'
import { Admin } from '../admin/Admin'
import { ProductsManager } from '../admin/products/ProductsManager'
import { CategoriesManager } from '../admin/categories/CategoriesManager'
import { UsersManager } from '../admin/users/UsersManager'
import { User } from '../admin/users/User'
import { Product } from './Product'
import { Cart } from './Cart'
import { Products } from './Products'
import { EditProductWrapper } from '../admin/products/EditProductWrapper'
import { EditCategoryWrapper } from '../admin/categories/EditCategoryWrapper'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export const NavBar = () => {
  const itemsNo = useSelector((state: RootState) => state.cartItems.itemsNo)
  return (
    <>
      <BrowserRouter>
        <div className="upper-header">
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/home#products">Products</Link>
              </li>
              <li>
                <Link to="/home/#contactUs">Contact us</Link>
              </li>

              <li>
                <Link to="/home/admin">Admin</Link>
              </li>
            </ul>
          </nav>
          <Link to="/cart">
            <div id="cart-icon">
              <img
                src="..\..\src\images\shopping-cart-outline-svgrepo-com.svg"
                alt="cart icon"
                className="cart-icon"
              />
              <span className="items-no">{itemsNo}</span>
            </div>
          </Link>
        </div>
        <Routes>
          <Route path="/home" element={<App />} />

          <Route path="/home#products" element={<Products />} />
          <Route path="/products/product/:id" element={<Product />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/user/profile/:id" element={<User />} />

          <Route path="/home/admin/" element={<Admin />} />

          <Route path="/home/admin/products" element={<ProductsManager />} />
          <Route path="/home/admin/products/:id" element={<EditProductWrapper />} />

          <Route path="/home/admin/categories" element={<CategoriesManager />} />

          <Route path="/home/admin/users" element={<UsersManager />} />
          <Route path="/home/admin/users/:id" element={<User />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
