import { SuperInventoryItemInterface, SuperInventoryTypeInterface } from "../../super-inventory/super.inventory.interface"

/**
 * Representa un elemento de inventario de GMP Packing Scale Calibration
 * 
 * @export
 * @interface InventoryItem
 */

export interface InventoryItem extends SuperInventoryItemInterface {
  position: number
}

/**
 * Representa un tipo de inventario de GMP Packing Scale Calibration, el cual
 * contiene un arreglo de elementos de inventario de GMP Packing Scale
 * Calibration
 * 
 * @export
 * @interface InventoryType
 */

export interface InventoryType extends SuperInventoryTypeInterface {
  name: string
  items: Array<InventoryItem>
}