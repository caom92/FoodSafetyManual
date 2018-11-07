import { SuperCaptureLog } from '../../super-logs/super.logs.capture.interface'

export interface CaptureLog extends SuperCaptureLog {
  notes: string
  items: Array<CaptureItem>
}

export interface CaptureItem {
  id: number
  time: string
  approved: boolean
  condition: boolean
  is_sanitized: boolean
  corrective_action: string
}