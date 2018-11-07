import { SuperUpdateLog } from '../../super-logs/super.logs.update.interface'

export interface UpdateLog extends SuperUpdateLog {
  notes: string
  items: Array<UpdateItem>
}

export interface UpdateItem {
  id: number
  time: string
  approved: boolean
  condition: boolean
  corrective_action: string
  is_sanitized: boolean
}