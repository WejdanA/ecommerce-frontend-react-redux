import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

export const Admin = () => {
  return (
    <div className="main-content">
      <h1> admin page</h1>
      <div className="side-bar">
        <div>
          <Link to="/admin/products">Products</Link>
        </div>
        <div>
          <Link to="/admin/categories">Categories</Link>
        </div>
        <div>
          <Link to="/admin/users">Users</Link>
        </div>
        <div>
          <Link to="/admin/orders">Orders</Link>
        </div>
      </div>
    </div>
  )
}
