import { RegisterEntryInterface } from '../../interfaces/register.interface'

export interface FinishedProductEntryInterface extends RegisterEntryInterface {
  code?: string
  description?: string
  folio?: string
  temperature?: number
  color?: number
  label?: number
  weight?: number
  traceability?: number
  small_count?: number
  big_count?: number
  deformation?: number
  insect_damage?: number
  scarring?: number
  decoloration?: number
  dehydration?: number
  mechanical_damage?: number
  mushiness?: number
  bruises?: number
  status_id?: number
  sampling?: number
  exposition_temperature?: number
  notes?: string
}
