import { SuperInventoryItemInterface } from '../../../super-inventory/super.inventory.interface'

export interface InventoryCheck extends SuperInventoryItemInterface {

}

export interface InventoryType {
  id: number
  name: string
  inventory: Array<InventoryCheck>
}
