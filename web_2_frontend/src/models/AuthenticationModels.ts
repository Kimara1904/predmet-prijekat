export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  birthDate: Date
  address: string
  role: string
}

export interface GoogleAuth {
  token: string
}
