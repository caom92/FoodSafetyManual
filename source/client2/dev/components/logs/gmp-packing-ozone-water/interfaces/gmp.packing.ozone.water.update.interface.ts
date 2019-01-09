import { SuperUpdateLog } from '../../super-logs/super.logs.update.interface'

export interface UpdateLog extends SuperUpdateLog {
  items: Array<UpdateItem>
}

export interface UpdateItem {
  id: number
  entries: Array<UpdateEntry>
}

export interface UpdateEntry {
  test_number: number
  time: string
  reading?: number
  ph?: number
  orp?: number
  temperature?: number
  corrective_action?: string
  product?: string
  lot?: string
  parcel?: string
  reference?: string
  total_chlorine?: number
  free_chlorine?: number
  rinse?: number
  status?: boolean
}