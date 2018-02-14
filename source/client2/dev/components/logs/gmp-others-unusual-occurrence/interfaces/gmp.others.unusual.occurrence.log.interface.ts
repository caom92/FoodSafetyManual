import { SuperLog } from '../../super-logs/super.logs.log.interface'

export interface Log extends SuperLog {
  items: LogItem
}

export interface LogItem {
  shifts: Array<LogShift>
}

export interface LogShift {
  shift_id: number
  name: string
}