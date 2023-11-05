import { MultiValue } from 'react-select'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useState, ChangeEvent, useEffect } from 'react'

import { AppDispatch, RootState } from '../../../redux/store'
import { editProduct, getProductById, ProductType } from '../../../redux/slices/productSlice'

import { ProductForm } from './ProductForm'

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

type Inputs = {
  name: string
  image: string
  description: string
  categories: []
  variants: []
  sizes: []
}

type OptionType = { value: string; label: string; name: string }

export function EditProductWrapper() {
  const { id } = useParams()

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const currentProduct = useSelector((state: RootState) => state.products.product)
  const categories = useSelector((state: RootState) => state.categories.categories)

  const [product, setProduct] = useState<ProductType>(initialProductState)

  useEffect(() => {
    dispatch(getProductById(id))
  }, [id])

  useEffect(() => {
    setProduct(currentProduct)
  }, [currentProduct])

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
    // update the product
    console.log('product', product)
    dispatch(editProduct(product))
    // Reset the form
    setProduct(initialProductState)
    navigate('/admin/products')
  }

  return (
    <div>
      <ProductForm
        formSubmit={formSubmit}
        handleChange={handleChange}
        product={product}
        categories={categories}
        formType={'Update Product'}
      />
    </div>
  )
}
