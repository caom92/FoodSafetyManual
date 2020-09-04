import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  inspection_start_date: string
  inspection_start_time: string
  inspection_end_date: string
  inspection_end_time: string
  commodities: string
  units: number
  unit_type: number
  grower: string
  block_code: string
  contact: string
  location: string
  country: string
  items: Array<AuthorizationItem>
  unit_types: Array<AuthorizationUnitType>
}

export interface AuthorizationItem {
  id: number
  name: string
  status: number
  comment: string
}

export interface AuthorizationUnitType {
  id: number
  name_en: string
  name_es: string
}