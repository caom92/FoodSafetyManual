import { SuperCaptureLog } from "../../super-logs/super.logs.capture.interface"

export interface CaptureLog extends SuperCaptureLog {
  notes: string
  corrective_action: string
  types: Array<CaptureType>
}

export interface CaptureType {
  id: number
  time: string
  items: Array<CaptureItem>
}

export interface CaptureItem {
  id: number
  test: number
  unit_id: number
  status: boolean
  is_sanitized: boolean
}