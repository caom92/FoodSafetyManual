import { SuperWaiting } from '../../super-logs/super.logs.waiting.interface'

export interface Log extends SuperWaiting {
  days: Array<LogDay>
}

export interface LogDay {
  date: string
  day_num: number
  types: Array<LogType>
}

export interface LogType {
  type_id: number
  name_en: string
  name_es: string
  issue_time?: string
  issue_qty?: number
  issue_conditions?: number
  recovery_time?: string
  recovery_qty?: number
  recovery_conditions?: number
  sanitation?: string
  deficiencies?: string
  corrective_actions?: string
}