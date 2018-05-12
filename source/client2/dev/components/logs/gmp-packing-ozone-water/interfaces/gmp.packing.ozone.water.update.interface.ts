import { SuperUpdateLog } from '../../super-logs/super.logs.update.interface'

export interface UpdateLog extends SuperUpdateLog {
  items: Array<UpdateItem>
}

export interface UpdateItem {
  id: number
  reading: number
  ph: number
  orp: number
  temperature: number
  corrective_action: string
  product: string
  batch: string
  parcel: string
  reference: string
  total_chlorine: number
  free_chlorine: number
  rinse: number
  status: boolean
}