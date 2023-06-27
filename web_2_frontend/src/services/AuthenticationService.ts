import axios, { AxiosResponse } from 'axios'

import { TokenResponse } from '../models/TokenModel'
import { GoogleAuth, LoginRequest, RegisterRequest } from '../models/AuthenticationModels'
import { baseUrl } from './ServiceConfig'

const url = `${baseUrl}/api/authentication/`

export const login = async (request: LoginRequest): Promise<AxiosResponse<TokenResponse>> => {
  return await axios.post<TokenResponse>(`${url}login`, request)
}

export const register = async (request: RegisterRequest): Promise<AxiosResponse<string>> => {
  return await axios.post<string>(`${url}register`, request)
}

export const googleAuth = async (request: GoogleAuth): Promise<AxiosResponse<TokenResponse>> => {
  return await axios.post<TokenResponse>(`${url}google-authentication`, request)
}
