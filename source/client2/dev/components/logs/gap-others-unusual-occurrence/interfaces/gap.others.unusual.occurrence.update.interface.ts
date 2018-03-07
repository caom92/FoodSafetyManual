import { SuperUpdateLog } from '../../super-logs/super.logs.update.interface'

export interface UpdateLog extends SuperUpdateLog {
  time: string
  incident_date: string
  shift_id: number
  area_id: string
  product_id: string
  batch: string
  description: string
  corrective_action: string
  album_url: string
}