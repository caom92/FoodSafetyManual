/**
 * Representa un elemento de inventario de GMP Packing Scale Calibration
 * 
 * @export
 * @interface InventoryItem
 */

export interface InventoryItem {
  id: number
  is_active: number
  name: string
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

export interface InventoryType {
  id: number
  name: string
  items: Array<InventoryItem>
}