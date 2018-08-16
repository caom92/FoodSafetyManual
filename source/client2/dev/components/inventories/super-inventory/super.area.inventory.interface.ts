export interface SuperInventoryAreaInterface {
  id: number
  position: number
  name: string
  is_active?: number
}

// TODO: Los servicios de area deberían estar unificados, y considerar a las
// áreas como elementos que contienen items

export interface SuperInventoryEditAreaInterface {
  area_id: number
  area_name: string
  room_id?: number
  name?: string
}