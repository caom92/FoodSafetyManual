import { SuperUpdateLog } from "../../super-logs/super.logs.update.interface"

export interface UpdateLog extends SuperUpdateLog {
  notes: string
  album_url: string
  areas: Array<UpdateArea>
}

export interface UpdateArea {
  id: number
  time: string
  notes: string
  person_performing_sanitation: string
  items: Array<UpdateItem>
}

export interface UpdateItem {
  id: number
  is_acceptable: boolean
  corrective_action_id: number
  comment: string
}