import { SuperLog } from './super.logs.log.interface'

export interface SuperWaiting extends SuperLog {
  report_id?: number
  created_by?: string
  creation_date?: string
}