import { SuperWaiting } from '../../super-logs/super.logs.waiting.interface'

export interface Log extends SuperWaiting {
  items: Array<LogItem>
}

export interface LogItem {
  id: number
  name: string
  fields: Array<LogField>
  entries?: Array<LogEntry>
}

export interface LogEntry {
  test_number: number
  time: string
  fields: Array<LogField>
}

export interface LogField {
  id: number
  name_en: string
  name_es: string
  field_id: number
  value?: string | number
}