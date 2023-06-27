import { PickedItemInfo } from '../models/OrderItemModels'

export const CalculateItemPrice = (items: PickedItemInfo[]): number => {
  let sum = 0
  items.forEach((item) => {
    sum += item.price
  })
  return sum
}
