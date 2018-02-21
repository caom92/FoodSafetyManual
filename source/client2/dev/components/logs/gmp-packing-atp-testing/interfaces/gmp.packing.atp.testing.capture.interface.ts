import { FormGroup } from '@angular/forms'

import { SuperCaptureLog } from '../../super-logs/super.logs.capture.interface'

export interface CaptureLog extends SuperCaptureLog {
  notes: string
  areas: Array<CaptureEntry>
}

export interface CaptureEntry {
  name: string
  time: string
  items: Array<CaptureItem> | Array<FormGroup>
}

export interface CaptureItem {
  test_number: number
  test1: number
  results1: boolean
  corrective_action: string
  test2: number
  results2: boolean
}