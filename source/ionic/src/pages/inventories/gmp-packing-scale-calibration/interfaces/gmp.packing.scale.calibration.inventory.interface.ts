export interface InventoryItem {
  id: number
  is_active: number
  name: string
  position: number
}

export interface InventoryType {
  id: number
  name: string
  items: Array<InventoryItem>
}