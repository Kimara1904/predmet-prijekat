import axios, { AxiosResponse } from 'axios'

import { Article } from '../models/ArticleModels'
import { baseUrl } from './ServiceConfig'

const url = `${baseUrl}/api/articles`

export const createArticle = async (request: FormData): Promise<AxiosResponse<Article>> => {
  return await axios.post<Article>(`${url}`, request)
}

export const getSellersArticle = async (): Promise<AxiosResponse<Article[]>> => {
  return await axios.get<Article[]>(`${url}/all-sellers`)
}

export const getAllArticles = async (): Promise<AxiosResponse<Article[]>> => {
  return await axios.get<Article[]>(`${url}`)
}

export const getArticleById = async (id: number): Promise<AxiosResponse<Article>> => {
  return await axios.get<Article>(`${url}/${id}`)
}

export const modifyArticle = async (
  id: number,
  request: FormData
): Promise<AxiosResponse<Article>> => {
  return await axios.patch<Article>(`${url}/${id}`, request)
}

export const deleteArticle = async (id: number): Promise<AxiosResponse> => {
  return await axios.delete(`${url}/${id}`)
}
