import { SuperCaptureLog } from '../../super-logs/super.logs.capture.interface'

export interface CaptureLog extends SuperCaptureLog {
  entries: Array<CaptureEntry>
}

export interface CaptureEntry {
  batch: string
  production_area_id: string
  supplier_id: string
  product_id: string
  customer_id: string
  quality_type_id: number
  origin: string
  expiration_date: string
  water_temperature: number
  product_temperature: number
  is_weight_correct: boolean
  is_label_correct: boolean
  is_trackable: boolean
  notes: string
  album_url: string
}