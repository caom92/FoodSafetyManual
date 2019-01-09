import { SuperLog } from '../../super-logs/super.logs.log.interface'

export interface Log extends SuperLog {
  items: Array<LogItem>
}

export interface LogItem {
  id: number
  name: string
  fields: Array<LogField>
}

export interface LogField {
  id: number
  name_en: string
  name_es: string
  field_id: number
}