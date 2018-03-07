import { FormGroup } from '@angular/forms'

import { SuperCaptureLog } from '../../super-logs/super.logs.capture.interface'

export interface CaptureLog extends SuperCaptureLog {
  notes: string
  album_url: string
  areas: Array<CaptureArea>
}

export interface CaptureArea {
  id: number
  time: string
  notes: string
  person_performing_sanitation: string
  items: Array<CaptureItem> | Array<FormGroup>
}

export interface CaptureItem {
  id: number
  is_acceptable: boolean
  corrective_action: number
  comment: string
}