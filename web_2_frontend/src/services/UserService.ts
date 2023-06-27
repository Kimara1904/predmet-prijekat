import axios, { AxiosResponse } from 'axios'

import { baseUrl } from './ServiceConfig'
import { User, UserVerify } from '../models/UserModels'

const url = `${baseUrl}/api/users`

export const getVerifiedSeller = async (): Promise<AxiosResponse<User[]>> => {
  return await axios.get<User[]>(`${url}/verified`)
}

export const getUnverifiedSeller = async (): Promise<AxiosResponse<User[]>> => {
  return await axios.get<User[]>(`${url}/unverified`)
}

export const verifySeller = async (request: UserVerify): Promise<AxiosResponse<string>> => {
  return await axios.put<string>(`${url}/verify`, request)
}

export const getMyProfile = async (): Promise<AxiosResponse<User>> => {
  return await axios.get<User>(`${url}/my-profile`)
}

export const editMyProfile = async (request: FormData): Promise<AxiosResponse<User>> => {
  return await axios.patch<User>(`${url}`, request)
}
