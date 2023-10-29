import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { NewProductWrapper } from './products/NewProductWrapper'
import { ProductForm } from './products/ProductForm'
import { ProductsManager } from './products/ProductsManager'
import { CategoriesManager } from './categories/CategoriesManager'
import { Cart } from '../home/Cart'

export const Admin = () => {
  return (
    <div className="main-content">
      <h1> admin page</h1>
      <div className="side-bar">
        <Link to="/home/admin/products">products</Link>
        <Link to="/home/admin/categories">Categories</Link>
        <Link to="/home/admin/users">Users</Link>
      </div>
    </div>
  )
}
