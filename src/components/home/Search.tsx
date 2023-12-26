import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import { updateQueryParams } from '../../redux/slices/productSlice'

export const Search = () => {
  const dispatch = useDispatch()
  const searchHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value
    dispatch(updateQueryParams({ name: 'search', value: searchTerm }))
  }

  return (
    <div id="search">
      <input
        type="text"
        id="search-term"
        className="search"
        placeholder="search by name"
        onChange={searchHandle}
      />
    </div>
  )
}
