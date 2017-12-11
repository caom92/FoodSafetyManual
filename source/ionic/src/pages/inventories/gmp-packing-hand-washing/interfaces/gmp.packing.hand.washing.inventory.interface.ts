import { SuperInventoryItemInterface } from "../../super-inventory/super.inventory.interface"

export interface InventoryItem extends SuperInventoryItemInterface {
  id: number
  name: string
  is_active: number
}