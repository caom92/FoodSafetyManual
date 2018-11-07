import { SuperCaptureLog } from '../../super-logs/super.logs.capture.interface'

export interface CaptureLog extends SuperCaptureLog {
  time: string
  items: Array<CaptureItem>
}

export interface CaptureItem {
  id: number
  test: number
  calibration: boolean
  sanitization: boolean
  deficiencies: string
  corrective_action: string
}