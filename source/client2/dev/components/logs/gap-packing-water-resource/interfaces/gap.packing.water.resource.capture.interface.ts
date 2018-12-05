import { SuperCaptureLog } from '../../super-logs/super.logs.capture.interface'

export interface CaptureLog extends SuperCaptureLog {
  areas: Array<CaptureItem>
}

export interface CaptureArea {
  id: number
  items: Array<CaptureItem>
}

export interface CaptureItem {
  id: number
  date: string
  compliance: boolean
  corrective_actions: string
}