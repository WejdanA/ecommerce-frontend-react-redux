import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SubmitHandler } from 'react-hook-form'

import { ProductForm } from './ProductForm'
import {
  editProduct,
  getProductById,
  ProductType
} from '../../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { useParams } from 'react-router-dom'

const initialProductState: ProductType = {
  id: 0,
  name: '',
  image: '',
  description: '',
  categories: [],
  variants: [],
  sizes: []
}

export function EditProductWrapper() {
  const { id } = useParams()

  const dispatch = useDispatch<AppDispatch>()
  const currentProduct = useSelector((state: RootState) => state.products.product)
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

  useEffect(() => {
    dispatch(getProductById(id))
  }, [id])

  useEffect(() => {
    setProduct(currentProduct)
  }, [currentProduct])

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

  const formSubmit: SubmitHandler<Inputs> = (data) => {
    // update the product

    dispatch(editProduct(product))
    // Reset the form
    setProduct(initialProductState)
  }

  return (
    <div>
      <h3 className="text-2xl font-bold main-content">Edit product</h3>
      <ProductForm
        formSubmit={formSubmit}
        handleChange={handleChange}
        product={product}
        categories={categories}
      />
    </div>
  )
}
