import { SuperUpdateLog } from "../../super-logs/super.logs.update.interface"

export interface UpdateLog extends SuperUpdateLog {
  notes: string
  stations: Array<UpdateItem>
}

export interface UpdateItem {
  id: number
  is_secured: boolean
  condition: boolean
  activity: boolean
  corrective_actions: string
}