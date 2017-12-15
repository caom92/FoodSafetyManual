import { SuperInventoryItemInterface } from "../../super-inventory/super.inventory.interface"

export interface InventoryItem extends SuperInventoryItemInterface {
  order: number
}
