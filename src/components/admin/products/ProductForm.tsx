import { ChangeEvent, useEffect, useState } from 'react'
import Select from 'react-select'
import { MultiValue } from 'react-select'
import { useForm, SubmitHandler } from 'react-hook-form'

import { CategoryOptionType, ProductInputType } from '../../../types/productTypes'
import { CategoryType } from '../../../types/categoryTypes'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { fetchCategories } from '../../../redux/slices/categorySlice'

type ProductFormProps = {
  product: ProductInputType
  chosenCategories: CategoryOptionType[]
  formSubmit: SubmitHandler<ProductInputType>
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | MultiValue<CategoryOptionType>
  ) => void
  formType: string
}

export function ProductForm({
  product,
  chosenCategories,
  formSubmit,
  handleChange,
  formType
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductInputType>({
    values: {
      name: product?.name,
      price: product?.price,
      description: product?.description,
      quantity: product?.quantity
    }
  })
  const { categories } = useSelector((state: RootState) => state.categories)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  let options: CategoryOptionType[] = []
  let option: CategoryOptionType
  categories.map((category) => {
    option = { value: category._id + '', label: category.name }
    options = [...options, option]
  })
  console.log('options', options)

  const inputStyle = 'contact-input'
  const labelStyle = 'block text-sm font-medium text-gray-600'

  return (
    <section className="contact">
      <form onSubmit={handleSubmit(formSubmit)} className="contact-form product">
        <div className="input-group">
          <label htmlFor="name" className={labelStyle}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: true })}
            onChange={handleChange}
            className={inputStyle}
          />
          {errors.name && <span className="error">*The name can't be empty</span>}
        </div>
        <div className="input-group">
          <label htmlFor="price" className={labelStyle}>
            Price:
          </label>
          <input
            type="text"
            id="price"
            {...register('price', { required: true, min: 1 })}
            onChange={handleChange}
            className={inputStyle}
          />
          {errors.name && (
            <>
              <span className="error">*The price can't be empty</span>
              <span className="error">*The price can't be less than 1</span>
            </>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="image" className={labelStyle}>
            Image:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register('image')}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div className="input-group">
          <label htmlFor="description" className={labelStyle}>
            Description:
          </label>
          <textarea
            id="description"
            {...register('description', {
              required: true
            })}
            onChange={handleChange}
            className={inputStyle}
          />

          {errors.description && <span className="error">*the description can not be empty</span>}
        </div>
        <div className="input-group">
          <label htmlFor="categories" className={labelStyle}>
            Categories: ( choose multiple categories)
          </label>
          <Select
            isMulti
            {...register('categories', {
              required: false
            })}
            name="cat"
            options={options}
            className={inputStyle}
            classNamePrefix="select"
            onChange={handleChange}
            required
          />
          {errors.categories && <span className="error">*Choose atleast one category</span>}
        </div>

        <div className="input-group">
          <label htmlFor="quantity" className={labelStyle}>
            quantity:
          </label>
          <input
            type="text"
            id="quantity"
            {...register('quantity', { required: true, min: 1 })}
            onChange={handleChange}
            className={inputStyle}
          />
          {errors.name && (
            <>
              <span className="error">*The quantity can't be less than 0</span>
            </>
          )}
        </div>

        <button type="submit" className="form-btn">
          {formType}
        </button>
      </form>
    </section>
  )
}
