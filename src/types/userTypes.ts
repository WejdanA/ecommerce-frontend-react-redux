export type UserType = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean
  isBanned: boolean
  balance: number
}
export type UserInputType = Omit<UserType, '_id'>

export type UserState = {
  users: UserType[]
  error: null | string
  success: null | string
  isLoading: boolean
  isLogin: boolean
  loginUser: null | UserType
}
export type LoginType = {
  email: string
  password: string
}

export type ResetPasswordType = {
  password: string
  token: string | null
}

export type BannedInfoType = {
  _id: string
  isBanned: boolean
}

export type RoleInfoType = {
  _id: string
  isAdmin: boolean
}
