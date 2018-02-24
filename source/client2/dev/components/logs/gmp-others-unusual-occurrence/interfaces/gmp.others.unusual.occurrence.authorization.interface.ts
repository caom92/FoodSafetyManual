import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'
import { LogShift } from './gmp.others.unusual.occurrence.log.interface'

export interface Authorization extends SuperAuthorization {
  items: AuthorizationItem
}

export interface AuthorizationItem {
  shifts: Array<LogShift>
  entry: LogEntry
}

export interface LogEntry {
  incident_date: string
  time: string
  shift: string
  shift_id: number
  area: string
  product_name: string
  batch: string
  description: string
  corrective_action: string
  album_url: string
}