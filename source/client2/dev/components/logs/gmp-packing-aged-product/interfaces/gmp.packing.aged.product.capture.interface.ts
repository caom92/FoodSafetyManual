import { SuperCaptureLog } from "../../super-logs/super.logs.capture.interface"

export interface CaptureLog extends SuperCaptureLog {
  entries: Array<CaptureEntry>
}

export interface CaptureEntry {
  batch: string
  warehouse: string
  vendor: string
  item: string
  age: number
  quality_id: number
  packed_date: string
  quantity: number
  location: string
  action_id: number
  album_url: string
  notes: string
  origin: string
}