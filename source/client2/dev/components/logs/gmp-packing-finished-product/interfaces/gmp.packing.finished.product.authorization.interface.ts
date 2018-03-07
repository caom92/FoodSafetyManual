import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'
import { LogQualityTypes } from './gmp.packing.finished.product.log.interface'

export interface Authorization extends SuperAuthorization {
  items: AuthorizationItem
}

export interface AuthorizationItem {
  quality_types: Array<LogQualityTypes>
  entries: Array<AuthorizationEntry>
}

export interface AuthorizationEntry {
  batch: string
  production_area: string
  supplier: string
  product: string
  customer: string
  quality_id: number
  quality: string
  origin: string
  expiration_date: string
  water_temperature: number
  product_temperature: number
  is_weight_correct: number
  is_label_correct: number
  is_trackable: number
  notes: string
  album_url: string
}