import { RegisterEntryInterface } from '../../interfaces/register.interface'

export interface FinishedProductEntryInterface extends RegisterEntryInterface {
  code?: string
  time?: string
  description?: string
  folio?: string
  temperature?: number
  color?: number
  label?: number
  weight?: number
  traceability?: number
  mark?: number
  //small_count?: number
  //big_count?: number
  //deformation?: number
  insect_damage?: number
  //scarring?: number
  decoloration?: number
  dehydration?: number
  mechanical_damage?: number
  soggy?: number
  decay?: number
  wrinkly?: number
  busted?: number
  //mushiness?: number
  //bruises?: number
  status_id?: number
  status_name?: string
  sampling?: number
  exposition_temperature?: number
  notes?: string
}
