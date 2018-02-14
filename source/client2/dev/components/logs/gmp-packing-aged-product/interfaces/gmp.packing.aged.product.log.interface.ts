import { SuperLog } from '../../super-logs/super.logs.log.interface'

export interface Log extends SuperLog {
  log_info: LogItem
}

export interface LogItem {
  actions: Array<LogActions>
  quality_types: Array<LogQualityTypes>
}

export interface LogActions {
  id: number
  name: string
}

export interface LogQualityTypes {
  id: number
  name: string
}