import Select from 'react-select'
import { MultiValue } from 'react-select'

import { useSelector, useDispatch } from 'react-redux'

import { RootState, AppDispatch } from '../../redux/store'
import { getProductsByCategory } from '../../redux/slices/productSlice'

type OptionType = { value: number; label: string; name: string }

export const Filter = () => {
  const { categories } = useSelector((state: RootState) => state.categories)
  const dispatch = useDispatch<AppDispatch>()

  let catOptions: OptionType[] = []
  let catOption: OptionType
  categories.map((category) => {
    catOption = { value: category.id, label: category.name, name: category.name }

    catOptions = [...catOptions, catOption]
  })

  const filterHandle = (selectedCats: MultiValue<OptionType>) => {
    const selectedCatIds = selectedCats.map((selectedCat) => selectedCat.value)

    console.log(selectedCatIds)
    dispatch(getProductsByCategory(selectedCatIds))
  }

  return (
    <div id="filter">
      <Select
        className="filter"
        isMulti
        options={catOptions}
        onChange={filterHandle}
        placeholder="filter by category"
      />
    </div>
  )
}
