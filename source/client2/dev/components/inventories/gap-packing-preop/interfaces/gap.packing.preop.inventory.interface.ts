import { SuperInventoryItemInterface } from "../../super-inventory/super.inventory.interface"

export interface InventoryItem extends SuperInventoryItemInterface {

}

export interface InventoryType {
  id: number
  en: string
  es: string
  inventory: Array<InventoryItem>
}