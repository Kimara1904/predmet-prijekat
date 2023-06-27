import { ReactNode } from 'react'

import { PickedItemInfo } from './OrderItemModels'

export interface DashboardContextModel {
  content: string
  setContent: (mark: string) => void
}

export interface ProviderModel {
  children: ReactNode
}

export interface CartContextModel {
  items: PickedItemInfo[]
  onAdd: (item: PickedItemInfo) => void
  onRemove: (id: number) => void
  onChange: (id: number, amount: number) => void
  onRemoveAll: () => void
}
