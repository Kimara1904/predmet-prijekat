import axios, { AxiosResponse } from 'axios'

import { CreateOrder, Order } from '../models/OrderModels'
import { baseUrl } from './ServiceConfig'
import { makeQuery } from '../helpers/QueryHelper'

const url = `${baseUrl}/api/orders`

export const getAllOrders = async (): Promise<AxiosResponse<Order[]>> => {
  return await axios.get<Order[]>(`${url}`)
}

export const getOrdersInDelivery = async (): Promise<AxiosResponse<Order[]>> => {
  return await axios.get<Order[]>(`${url}/sellers-in-delivery`)
}

export const getDeliveredOrder = async (): Promise<AxiosResponse<Order[]>> => {
  return await axios.get<Order[]>(`${url}/sellers-delivered`)
}

export const createOrder = async (request: CreateOrder): Promise<AxiosResponse<Order>> => {
  return await axios.post<Order>(`${url}`, request)
}

export const getMyOrders = async (): Promise<AxiosResponse<Order[]>> => {
  return await axios.get<Order[]>(`${url}/customers-orders`)
}

export const cancelOrder = async (id: number): Promise<AxiosResponse<string>> => {
  return await axios.put<string>(`${url}/cancel/${id}`)
}

export const getDeliveryPrice = async (ids: number[]): Promise<AxiosResponse<number>> => {
  const query = makeQuery(ids)
  return await axios.get<number>(`${url}/delivery-price${query}`)
}

export const payOrder = async (id: number): Promise<AxiosResponse<Order>> => {
  return await axios.put<Order>(`${url}/pay/${id}`)
}

export const aproveOrder = async (id: number): Promise<AxiosResponse<Order>> => {
  return await axios.put<Order>(`${url}/aprove/${id}`)
}

export const getUnapproved = async (): Promise<AxiosResponse<Order[]>> => {
  return await axios.get<Order[]>(`${url}/sellers-unapproved`)
}
