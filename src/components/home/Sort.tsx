import { useDispatch } from 'react-redux'
import { sortProducts } from '../../redux/slices/productSlice'
export const Sort = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <select
        name="sort"
        id="sort"
        className="sort"
        onChange={(e) => dispatch(sortProducts(e.target.value))}>
        <option value="0">Sort By(name or price)</option>
        <option value="1">name(A to Z)</option>
        <option value="-1">name(Z to A)</option>
        <option value="2"> price (low to high)</option>
        <option value="-2">price(high to low)</option>
      </select>
    </div>
  )
}
