import { useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SubmitHandler } from 'react-hook-form'

import { ProductForm } from './ProductForm'
import { addProduct, ProductType } from '../../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../../redux/store'

const initialProductState: ProductType = {
  id: 0,
  name: '',
  image: '',
  description: '',
  categories: [],
  variants: [],
  sizes: []
}

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
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
      <h3 className="text-2xl font-bold">Add a new product</h3>
      <ProductForm
        formSubmit={formSubmit}
        handleChange={handleChange}
        product={product}
        categories={categories}
      />
    </div>
  )
}
