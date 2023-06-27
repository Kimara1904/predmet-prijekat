import { UserRole } from '../models/TokenModel'

export const isUserLoggedIn = () => {
  return sessionStorage.getItem('token') !== null
}

export const isAdmin = () => {
  return sessionStorage.getItem('role') === UserRole.Admin
}

export const isSeller = () => {
  return sessionStorage.getItem('role') === UserRole.Seller
}

export const isSellerVerified = () => {
  return (
    sessionStorage.getItem('role') === UserRole.Seller &&
    sessionStorage.getItem('verified') === 'Accepted'
  )
}

export const isSellerWaiting = () => {
  return (
    sessionStorage.getItem('role') === UserRole.Seller &&
    sessionStorage.getItem('verified') === 'Wait'
  )
}

export const isSellerDenied = () => {
  return (
    sessionStorage.getItem('role') === UserRole.Seller &&
    sessionStorage.getItem('verified') === 'Denied'
  )
}

export const isCustomer = () => {
  return sessionStorage.getItem('role') === UserRole.Customer
}
