import { RegisterEntryInterface } from '../../interfaces/register.interface'

export interface VehicleCleaningEntryInterface extends RegisterEntryInterface {
  license_plate: string
  disinfection: number
  water_rinse: number
  conditions: number
  contamination_free: number
  corrective_action: string
  initials: string
}
