export const roleKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'

export enum UserRole {
  Admin = 'Admin',
  Customer = 'Customer',
  Seller = 'Seller'
}

export interface Jwt {
  sub: string
  jti: string
  iat: string
  UserId: string
  Email: string
  [roleKey]: string
  Verified: string
  exp: number
  iss: string
  aud: string
}

export interface TokenResponse {
  token: string
}
