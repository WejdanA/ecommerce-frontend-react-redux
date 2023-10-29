import { useDispatch, useSelector } from 'react-redux'
import { FormEvent } from 'react'

import { addCategory, editCategory, removeCategory } from '../../../redux/slices/categorySlice'

import { AppDispatch, RootState } from '../../../redux/store'
import { NewCategoryWrapper } from './NewCategoryWrapper'
import { Link } from 'react-router-dom'

export function CategoriesManager() {
  const dispatch = useDispatch<AppDispatch>()
  const categories = useSelector((state: RootState) => state.categories)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full main main-content main">
      {categories.isLoading && <h3> Loading categories...</h3>}
      <div className="card grid gap-4">
        <ul>
          {categories.categories.map((category) => (
            <li key={category.id} className="flex items-center gap-4 text-2xl mb-2">
              <span>{category.name}</span>
              <Link to={`/home/admin/categories/${category.id}`}>
                <button className=" text-red-400 text-xs">Edit</button>
              </Link>

              <button
                className=" text-red-400 text-xs"
                onClick={() => {
                  dispatch(removeCategory(category.id))
                }}>
                X
              </button>
            </li>
          ))}
        </ul>
        <form
          action="submit"
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            console.log(e.target[0].value)
            const category = { id: +new Date(), name: e.target[0].value }
            dispatch(addCategory(category))
          }}>
          <input id="category" name="category" placeholder="category name" />
          <input type="submit" value="Add category" />
        </form>
      </div>
    </div>
  )
}
