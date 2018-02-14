import { SuperCaptureLog } from "../../super-logs/super.logs.capture.interface"

export interface CaptureLog extends SuperCaptureLog {
  notes: string
  time: string
  areas: Array<CaptureItem>
}

export interface CaptureArea {
  id: number
  items: Array<CaptureItem>
}

export interface CaptureItem {
  id: number
  is_acceptable: boolean
}