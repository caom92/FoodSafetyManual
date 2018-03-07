import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'
import { LogQualityTypes, LogActions } from './gmp.packing.aged.product.log.interface'

export interface Authorization extends SuperAuthorization {
  log_info: AuthorizationItem
}

export interface AuthorizationItem {
  quality_types: Array<LogQualityTypes>
  actions: Array<LogActions>
  entries: Array<AuthorizationEntry>
}

export interface AuthorizationEntry {
  batch: string
  warehouse: string
  vendor: string
  item: string
  age: number
  quality_id: number
  quality: string
  origin: string
  packed_date: string
  quantity: number
  location: string
  action_id: number
  action_name: string
  notes: string
  album_url: string
}