import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { RootState } from '../../redux/store'
import { logout } from '../../redux/slices/userSlice'

import App from '../../App'
import { Product } from './Product'
import { Cart } from './Cart'
import { Products } from './Products'

import { SignUp } from '../user/SignUp'
import { Profile } from '../user/Profile'
import { LoginForm } from '../user/LoginForm'
import { ProtectedRoute } from '../user/ProtectedRoute'

import { Admin } from '../admin/Admin'
import { User } from '../admin/users/User'
import { AdminRoute } from '../admin/AdminRoute'
import { UsersManager } from '../admin/users/UsersManager'
import { OrdersManager } from '../admin/orders/OrdersManager'
import { ProductsManager } from '../admin/products/ProductsManager'
import { EditProductWrapper } from '../admin/products/EditProductWrapper'
import { CategoriesManager } from '../admin/categories/CategoriesManager'

export const NavBar = () => {
  const dispatch = useDispatch()
  const itemsNo = useSelector((state: RootState) => state.cartItems.itemsNo)
  const { isLogin, loginUser } = useSelector((state: RootState) => state.users)
  return (
    <>
      <BrowserRouter>
        <div className="upper-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/contactUs">Contact us</Link>
              </li>
              {isLogin && (
                <>
                  <li>
                    <Link to="/user/profile">Profile</Link>
                  </li>
                  {loginUser && loginUser.role == 'admin' && (
                    <li>
                      <Link to="/admin">Admin</Link>
                    </li>
                  )}

                  <li>
                    <Link to="/login" onClick={() => dispatch(logout())}>
                      logout
                    </Link>
                  </li>
                </>
              )}
              {!isLogin && (
                <>
                  <li>
                    <Link to="/login">login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign up</Link>
                  </li>
                </>
              )}
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
          <Route path="/" element={<App />} />

          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/user" element={<ProtectedRoute />}>
            <Route path="/user/profile" element={<Profile />} />
          </Route>

          <Route path="/admin" element={<AdminRoute />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/products" element={<ProductsManager />} />
            <Route path="/admin/products/:id" element={<EditProductWrapper />} />
            <Route path="/admin/categories" element={<CategoriesManager />} />
            <Route path="/admin/users" element={<UsersManager />} />
            <Route path="/admin/users/:id" element={<User />} />
            <Route path="/admin/orders" element={<OrdersManager />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
