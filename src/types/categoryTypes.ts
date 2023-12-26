export type CategoryType = {
  _id: string
  name: string
}

export type CategoryState = {
  categories: CategoryType[]
  error: null | string
  success: null | string
  isLoading: boolean
  category: CategoryType | {} | undefined
}
