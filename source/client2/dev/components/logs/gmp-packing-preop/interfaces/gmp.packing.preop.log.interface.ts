import { SuperLog } from '../../super-logs/super.logs.log.interface'

export interface Log extends SuperLog {
  areas: {
    corrective_actions: Array<CorrectiveAction>
    logs: Array<LogArea>
  }
  has_subject: boolean
}

export interface LogArea {
  id: number
  name: string
  types: Array<LogType>
}

export interface LogType {
  id: number
  en: string
  es: string
  items: Array<LogItem>
}

export interface LogItem {
  id: number
  name: string
  order: number
}

export interface CorrectiveAction {
  id: number
  code: string
  en: string
  es: string
}