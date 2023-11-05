import { useState, ChangeEvent } from 'react'
import { MultiValue } from 'react-select'
import { SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { ProductForm } from './ProductForm'
import { AppDispatch, RootState } from '../../../redux/store'
import { addProduct, ProductType } from '../../../redux/slices/productSlice'

const initialProductState: ProductType = {
  id: 0,
  name: '',
  image: '',
  description: '',
  price: 0,
  categories: [],
  variants: [],
  sizes: []
}

type OptionType = { value: string; label: string; name: string }

export function NewProductWrapper() {
  const dispatch = useDispatch<AppDispatch>()
  const categories = useSelector((state: RootState) => state.categories.categories)
  const [product, setProduct] = useState<ProductType>(initialProductState)
  type Inputs = {
    name: string
    image: string
    description: string
    categories: []
    variants: []
    sizes: []
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | MultiValue<OptionType>
  ) => {
    let categoriesEvent

    if (Array.isArray(e)) {
      let value: Number[] = []
      e.map((option) => {
        value = [...value, +option.value]
      })
      categoriesEvent = { name: 'categories', value: value }
    }

    const { name, value } = Array.isArray(e) ? categoriesEvent : e.target

    const isList = name === 'variants' || name === 'sizes'
    if (isList) {
      setProduct({
        ...product,
        [name]: value.split(',')
      })
      return
    }

    setProduct({
      ...product,
      [name]: value
    })
  }

  const formSubmit: SubmitHandler<Inputs> = () => {
    product.id = +new Date()

    // add product
    dispatch(addProduct(product))
    // Reset the form
    setProduct(initialProductState)
  }

  return (
    <div>
      <ProductForm
        formSubmit={formSubmit}
        handleChange={handleChange}
        product={product}
        categories={categories}
        formType={'Create Product'}
      />
    </div>
  )
}
