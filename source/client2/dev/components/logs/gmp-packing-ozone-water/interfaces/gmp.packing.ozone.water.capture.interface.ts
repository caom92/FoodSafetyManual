import { SuperCaptureLog } from '../../super-logs/super.logs.capture.interface'

export interface CaptureLog extends SuperCaptureLog {
  items: Array<CaptureItem>
}

export interface CaptureItem {
  id: number
  reading: number
  ph: number
  orp: number
  temperature: number
  corrective_action: string
  product: string
  lot: string
  parcel: string
  reference: string
  total_chlorine: number
  free_chlorine: number
  rinse: number
  status: boolean
}