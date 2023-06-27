import { Article } from './ArticleModels'

export interface OrderItem {
  id: number
  amount: number
  articleName: string
  articlePrice: number
}

export interface CreateItem {
  articleId: number
  amount: number
}

export interface PickedItemInfo {
  articleId: number
  name: string
  price: number
  amount: number
  capacity: number
}
