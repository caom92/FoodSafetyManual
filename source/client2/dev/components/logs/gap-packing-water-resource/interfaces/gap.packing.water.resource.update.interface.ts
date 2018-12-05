import { SuperUpdateLog } from '../../super-logs/super.logs.update.interface'

export interface UpdateLog extends SuperUpdateLog {
  areas: Array<UpdateItem>
}

export interface UpdateArea {
  id: number
  items: Array<UpdateItem>
}

export interface UpdateItem {
  id: number
  date: string
  compliance: boolean
  corrective_actions: string
}