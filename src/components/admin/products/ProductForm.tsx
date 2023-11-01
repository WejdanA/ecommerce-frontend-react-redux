import { ChangeEvent } from 'react'
import Select from 'react-select'
import { useForm, SubmitHandler } from 'react-hook-form'

import { ProductType } from '../../../redux/slices/productSlice'
import { CategoryType } from '../../../redux/slices/categorySlice'

type OptionType = { value: string; label: string; name: string }

type ProductFormProps = {
  product: ProductType
  categories: CategoryType[]
  formSubmit: SubmitHandler<Inputs>
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => void
  formType: string
}

type Inputs = {
  name: string
  image: string
  description: string
  categories: []
  variants: []
  sizes: []
}

export function ProductForm({
  product,
  categories,
  formSubmit,
  handleChange,
  formType
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    values: {
      name: product.name,
      image: product.image,
      description: product.description,
      variants: product.variants,
      sizes: product.sizes
    }
  })

  let options: OptionType[] = []
  let option: OptionType
  categories.map((category) => {
    option = { value: category.id + '', label: category.name, name: category.name }

    options = [...options, option]
  })

  const inputStyle =
    'w-full px-3 py-2 text-white border rounded-lg focus:outline-none focus:border-blue-400'
  const labelStyle = 'block text-sm font-medium text-gray-600'

  return (
    <form onSubmit={handleSubmit(formSubmit)} className="p-4 bg-gray-100 rounded-lg">
      <div className="mb-4">
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

      <div className="mb-4">
        <label htmlFor="image" className={labelStyle}>
          Image URL:
        </label>
        <input
          type="text"
          id="image"
          {...register('image', {
            required: true,
            pattern: /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??/
          })}
          onChange={handleChange}
          className={inputStyle}
        />
        {errors.image && <span className="error">*The image url can't be empty</span>}
        {errors.image && <span className="error">*Enter valid url</span>}
      </div>
      <div className="mb-4">
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
      <div className="mb-4">
        <label htmlFor="categories" className={labelStyle}>
          Categories: ( choose multiple categories)
        </label>
        <Select
          isMulti
          {...register('categories', {
            required: false
          })}
          options={options}
          className={inputStyle}
          classNamePrefix="select"
          onChange={handleChange}
          required
        />
        {errors.categories && <span className="error">*Choose atleast one category</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="variants" className={labelStyle}>
          Variants: (use comma , to create multiple)
        </label>
        <input
          type="text"
          id="variants"
          {...register('variants', {
            required: true
          })}
          onChange={handleChange}
          className={inputStyle}
        />
        {errors.variants && <span className="error">variants can't be empty</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="sizes" className={labelStyle}>
          Sizes: (use comma , to create multiple)
        </label>
        <input
          type="text"
          id="sizes"
          {...register('sizes', {
            required: true
          })}
          onChange={handleChange}
          className="w-full px-3 py-2 text-white border rounded-lg focus:outline-none focus:border-blue-400"
        />
        {errors.sizes && <span className="error">sizes can't be empty</span>}
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        {formType}
      </button>
    </form>
  )
}
