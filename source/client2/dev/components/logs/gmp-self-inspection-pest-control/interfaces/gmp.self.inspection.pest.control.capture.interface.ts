import { SuperCaptureLog } from '../../super-logs/super.logs.capture.interface'

export interface CaptureLog extends SuperCaptureLog {
  notes: string
  stations: Array<CaptureItem>
}

export interface CaptureItem {
  id: number
  is_secured: boolean
  condition: boolean
  activity: boolean
  corrective_actions: string
  observations: string
}