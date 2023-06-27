import React, { useState } from 'react'

import { CartContextModel, ProviderModel } from '../models/ContextModels'
import { PickedItemInfo } from '../models/OrderItemModels'

const CartContext = React.createContext<CartContextModel>({
  items: [],
  onAdd: () => {
    return
  },
  onRemove: () => {
    return
  },
  onChange: () => {
    return
  },
  onRemoveAll: () => {
    return
  }
})

export const CartContextProvider: React.FC<ProviderModel> = ({ children }) => {
  const [itemList, setItemList] = useState<PickedItemInfo[]>([])

  const handleAddItem = (item: PickedItemInfo) => {
    setItemList((prevItems) => [...prevItems, item])
  }

  const handleRemoveItem = (id: number) => {
    setItemList((prevItems) => prevItems.filter((item) => item.articleId !== id))
  }

  const handleChangeItem = (id: number, amount: number) => {
    setItemList((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.articleId === id) {
          return { ...item, amount: amount }
        }
        return item
      })
      return updatedItems
    })
  }

  const handleRemoveAll = () => {
    setItemList([])
  }

  return (
    <CartContext.Provider
      value={{
        items: itemList,
        onAdd: handleAddItem,
        onRemove: handleRemoveItem,
        onChange: handleChangeItem,
        onRemoveAll: handleRemoveAll
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
