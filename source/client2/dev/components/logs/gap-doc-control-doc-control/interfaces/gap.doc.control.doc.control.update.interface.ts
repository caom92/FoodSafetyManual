import { SuperUpdateLog } from '../../super-logs/super.logs.update.interface'

export interface UpdateLog extends SuperUpdateLog {
  entries: Array<UpdateEntry>
}

export interface UpdateEntry {
  date: string
  employee: string
  notes: string
  additional_info_url: string
}