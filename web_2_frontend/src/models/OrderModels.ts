import { CreateItem, OrderItem } from './OrderItemModels'

export interface Order {
  id: number
  buyerUsername?: string
  items: OrderItem[]
  itemPrice: number
  deliveryPrice: number
  address: string
  comment: string
  deliveryTime: string
  isCancled: boolean
  isApproved: boolean
  isPayed: boolean
}

export interface CreateOrder {
  items: CreateItem[]
  address: string
  comment: string
  payingMethod: string
  isPaying: boolean
}

export interface UnapprovedOrder {
  order: Order
  lat: number
  lon: number
}
