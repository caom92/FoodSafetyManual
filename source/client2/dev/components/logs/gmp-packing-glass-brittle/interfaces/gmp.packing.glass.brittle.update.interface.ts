import { SuperUpdateLog } from "../../super-logs/super.logs.update.interface"

export interface UpdateLog extends SuperUpdateLog {
  notes: string
  time: string
  areas: Array<UpdateArea>
}

export interface UpdateArea {
  id: number
  items: Array<UpdateItem>
}

export interface UpdateItem {
  id: number
  is_acceptable: boolean
}