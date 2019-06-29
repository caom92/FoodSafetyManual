import { SuperLog } from '../../super-logs/super.logs.log.interface'

export interface Log extends SuperLog {
  log_info: LogItem
}

export interface LogItem {
  quality_types: Array<LogQualityTypes>
}

export interface LogQualityTypes {
  id: number
  name: string
}