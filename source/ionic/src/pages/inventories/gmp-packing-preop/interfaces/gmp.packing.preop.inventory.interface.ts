export interface InventoryItem {
  id: number
  is_active: number
  position: number
  name: string
}

export interface InventoryType {
  id: number
  en: string
  es: string
  inventory: Array<InventoryItem>
}