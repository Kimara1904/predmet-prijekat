export interface User {
  username: string
  email: string
  firstName: string
  lastName: string
  birthDate: string
  address: string
  image: string
}

export interface UserVerify {
  username: string
  verified: string
}

export interface EditProfile {
  username?: string
  email?: string
  oldPassword?: string
  newPassword?: string
  firstName?: string
  lastName?: string
  birthDate?: string
  address?: string
  fileImage?: string
}
