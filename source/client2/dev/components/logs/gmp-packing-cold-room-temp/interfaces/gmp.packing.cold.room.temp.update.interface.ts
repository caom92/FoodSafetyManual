import { SuperUpdateLog } from "../../super-logs/super.logs.update.interface"

export interface UpdateLog extends SuperUpdateLog {
  time: string
  items: Array<UpdateItem>
}

export interface UpdateItem {
  id: number
  test: number
  humidity: number
  deficiencies: string
  corrective_action: string
}