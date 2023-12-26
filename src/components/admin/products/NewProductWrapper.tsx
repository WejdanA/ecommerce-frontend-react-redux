import { ChangeEvent, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { MultiValue } from 'react-select'
import 'react-toastify/dist/ReactToastify.css'

import { createProduct } from '../../../redux/slices/productSlice'
import { AppDispatch } from '../../../redux/store'
import { CategoryOptionType, ProductInputType } from '../../../types/productTypes'
import { ProductForm } from './ProductForm'

const initialProductState: ProductInputType = {
  name: '',
  description: '',
  image: undefined,
  price: 0,
  categories: [],
  quantity: 1
}

export function NewProductWrapper() {
  const dispatch = useDispatch<AppDispatch>()

  const [product, setProduct] = useState<ProductInputType>(initialProductState)
  const [chosenCategories, setChosenCategories] = useState<CategoryOptionType[]>()

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | MultiValue<CategoryOptionType>
  ) => {
    if (e.target?.type == 'file') {
      const fileInput = (e.target as HTMLInputElement) || ''
      setProduct({
        ...product,
        ['image']: fileInput.files?.[0]
      })
      return
    }

    if (Array.isArray(e)) {
      setChosenCategories(e)
      let value: string[] = []
      e.map((option) => {
        value = [...value, option.value]
      })

      setProduct({
        ...product,
        ['categories']: value
      })
      return
    }

    const { name, value } = e.target

    setProduct({
      ...product,
      [name]: value
    })
  }

  const formSubmit: SubmitHandler<Partial<ProductInputType>> = (data) => {
    const formData = new FormData()

    formData.append('name', product.name)
    formData.append('image', product.image as Blob)
    formData.append('description', product.description)
    formData.append('price', String(product.price))
    formData.append('quantity', String(product.quantity))
    let index = 0
    product.categories?.map((category) => {
      formData.append(`categories[${index}]`, category)
      index++
    })

    // add product
    dispatch(createProduct(formData))

    // Reset the form
    setProduct(initialProductState)
    setChosenCategories([])
  }

  return (
    <div>
      <ProductForm
        formSubmit={formSubmit}
        handleChange={handleChange}
        product={product}
        chosenCategories={chosenCategories}
        formType={'Create Product'}
      />
    </div>
  )
}
