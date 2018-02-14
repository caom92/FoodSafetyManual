import { SuperCaptureLog } from "../../super-logs/super.logs.capture.interface"

export interface CaptureLog extends SuperCaptureLog {
  time: string
  incident_date: string
  shift_id: number
  area_id: string
  product_id: string
  batch: string
  description: string
  corrective_action: string
  album_url: string
}