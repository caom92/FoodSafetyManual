import { SuperUpdateLog } from '../../super-logs/super.logs.update.interface'

export interface UpdateLog extends SuperUpdateLog {
  notes: string
  corrective_action: string
  types: Array<UpdateType>
}

export interface UpdateType {
  id: number
  time: string
  items: Array<UpdateItem>
}

export interface UpdateItem {
  id: number
  test: number
  unit_id: number
  quantity: number
  status: boolean
  is_sanitized: boolean
}