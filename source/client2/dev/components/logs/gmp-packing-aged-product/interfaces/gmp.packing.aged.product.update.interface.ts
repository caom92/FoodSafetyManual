import { SuperUpdateLog } from '../../super-logs/super.logs.update.interface'

export interface UpdateLog extends SuperUpdateLog {
  entries: Array<UpdateEntry>
}

export interface UpdateEntry {
  batch: string
  warehouse: string
  vendor: string
  item: string
  age: number
  quality_id: number
  origin: string
  packed_date: string
  quantity: number
  location: string
  action_id: number
  notes: string
  album_url: string
}