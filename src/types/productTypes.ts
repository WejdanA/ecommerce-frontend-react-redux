import { CategoryType } from './categoryTypes'

export type ProductType = {
  _id: string | undefined
  name: string
  image: File | undefined
  description: string
  price: number
  categories: CategoryType[]
  quantity: number
  sold?: number
}

export type CategoryOptionType = { value: string; label: string }

export type ProductInputType = {
  name: string
  image?: File | undefined
  description: string
  price: number
  categories: string[] | undefined
  quantity: number
  sold?: number
}

export type UpdatedProductType = {
  _id: string | undefined
  formData: FormData
}

export type Pagination = {
  totalPages: number
  currentpage: number
}
export type QueryParamsType = {
  currentPage: number
  limit: number
  search?: string
  rangeId: string
}

export type ProductState = {
  fetchedProducts: ProductType[]
  products: ProductType[]
  queryParams: QueryParamsType
  pagination: Pagination
  error: null | string
  success: null | string
  isLoading: boolean
  product: ProductType | undefined | null
  productInput: ProductInputType | null
  chosenCategories: CategoryOptionType[]
}
