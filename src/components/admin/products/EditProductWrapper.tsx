import { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { MultiValue } from 'react-select'

import { AppDispatch, RootState } from '../../../redux/store'
import { fetchProductData, updateProduct } from '../../../redux/slices/productSlice'
import { CategoryOptionType, ProductInputType } from '../../../types/productTypes'
import { ProductForm } from './ProductForm'

const initialProductState: ProductInputType = {
  name: '',
  description: '',
  price: 0,
  categories: [],
  quantity: 0
}

export function EditProductWrapper() {
  const { _id } = useParams()

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { productInput, chosenCategories } = useSelector((state: RootState) => state.products)

  const [product, setProduct] = useState<ProductInputType>(initialProductState)
  const [chosenOptions, setChosenOptions] = useState<CategoryOptionType[]>()

  useEffect(() => {
    dispatch(fetchProductData(_id))
  }, [_id])

  useEffect(() => {
    setProduct(productInput)
  }, [productInput])

  useEffect(() => {
    setChosenOptions(chosenCategories)
  }, [chosenCategories])
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

  const formSubmit: SubmitHandler<ProductInputType> = () => {
    // update the product

    const formData = new FormData()

    formData.append('name', product.name)
    if (product.image) {
      formData.append('image', product.image as Blob)
    }
    formData.append('description', product.description)
    formData.append('quantity', String(product.quantity))
    let index = 0
    product.categories?.map((category) => {
      formData.append(`categories[${index}]`, category)
      index++
    })
    dispatch(updateProduct({ _id, formData }))
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
        chosenCategories={chosenOptions}
        formType={'Update Product'}
      />
    </div>
  )
}
