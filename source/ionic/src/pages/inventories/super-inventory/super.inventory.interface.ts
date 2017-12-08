export interface SuperInventoryItemInterface {
  id: number
  name: string
  is_active: number
  position: number
}

export interface SuperInventoryTypeInterface {
  id: number
  items: Array<SuperInventoryItemInterface>
}