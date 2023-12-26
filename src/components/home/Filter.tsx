import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select, { MultiValue } from 'react-select'

import { getProductsByCategory, updateQueryParams } from '../../redux/slices/productSlice'
import { AppDispatch, RootState } from '../../redux/store'

import { fetchCategories } from '../../redux/slices/categorySlice'
import { CategoryOptionType } from '../../types/productTypes'

export const Filter = () => {
  const { categories } = useSelector((state: RootState) => state.categories)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])
  let catOptions: CategoryOptionType[] = []
  let catOption: CategoryOptionType
  categories.map((category) => {
    catOption = { value: category._id, label: category.name }

    catOptions = [...catOptions, catOption]
  })

  const filterHandle = (selectedCats: MultiValue<CategoryOptionType>) => {
    const selectedCatIds = selectedCats.map((selectedCat) => selectedCat.value)

    dispatch(getProductsByCategory(selectedCatIds))
  }

  return (
    <>
      <div id="filter">
        <Select
          className="filter"
          isMulti
          options={catOptions}
          onChange={filterHandle}
          placeholder="filter by category"
        />
      </div>
      <div>
        <select
          name="sort"
          id="sort"
          className="sort"
          onChange={(e) => dispatch(updateQueryParams({ name: 'rangeId', value: e.target.value }))}>
          <option value="range0">Filter By price</option>
          <option value="range1">o-99 SAR</option>
          <option value="range2">100-199 SAR</option>
          <option value="range3">200-399 SAR</option>
          <option value="range4">400-999 SAR </option>
          <option value="range5">greater than 1000 SAR</option>
        </select>
      </div>
    </>
  )
}
