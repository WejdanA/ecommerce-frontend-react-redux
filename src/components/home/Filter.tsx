import { ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState, AppDispatch } from '../../redux/store'
import { getProductsByCategory } from '../../redux/slices/productSlice'

export const Filter = () => {
  const { categories } = useSelector((state: RootState) => state.categories)
  const dispatch = useDispatch<AppDispatch>()

  let options: number[] = []
  const filterHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    const id = +e.target.id
    if (checked) {
      options.push(id)
    } else if (!checked) {
      options = options.filter((option) => option != id)
    }
    dispatch(getProductsByCategory(options))
  }

  return (
    <div id="filter">
      {categories.map((category) => (
        <li key={category.id}>
          <input
            type="checkbox"
            name={category.name}
            id={`${category.id}`}
            onChange={filterHandle}
          />
          <label htmlFor={`${category.id}`}>{category.name}</label>
        </li>
      ))}
    </div>
  )
}
