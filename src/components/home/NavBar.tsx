import { FaCartShopping } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import { RootState } from '../../redux/store'

import App from '../../App'
import { Cart } from './Cart'
import { Product } from './Product'

import { ActivateAccount } from '../user/ActivateAccount'
import { LoginForm } from '../user/LoginForm'
import { Logout } from '../user/Logout'
import { Profile } from '../user/Profile'
import { ProtectedRoute } from '../user/ProtectedRoute'
import { SignUp } from '../user/SignUp'

import { Admin } from '../admin/Admin'
import { AdminRoute } from '../admin/AdminRoute'
import { CategoriesManager } from '../admin/categories/CategoriesManager'
import { OrdersManager } from '../admin/orders/OrdersManager'
import { EditProductWrapper } from '../admin/products/EditProductWrapper'
import { ProductsManager } from '../admin/products/ProductsManager'
import { User } from '../admin/users/User'
import { UsersManager } from '../admin/users/UsersManager'
import { Contact } from './Contact'
import { ResetPassword } from '../user/ResetPassword'
import { ForgetPassword } from '../user/ForgetPassword'

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
                <Link to="/">Products</Link>
              </li>
              <li>
                <Link to="/contactUs">Contact us</Link>
              </li>
              {isLogin && (
                <>
                  <li>
                    <Link to="/user/profile">Profile</Link>
                  </li>
                  {loginUser && loginUser.isAdmin && (
                    <li>
                      <Link to="/admin">Dashboard</Link>
                    </li>
                  )}

                  <li>
                    <Link to="/logout">logout</Link>
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
            <div id="cart" className="cart-button">
              <FaCartShopping className="cart-icon" />
              <span className="items-no">{itemsNo}</span>
            </div>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<App />} />

          <Route path="/products" element={<App />} />
          <Route path="/contactUs" element={<Contact />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/users/activate" element={<ActivateAccount />} />
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
