import { SuperWaiting } from '../../super-logs/super.logs.waiting.interface'

export interface Log extends SuperWaiting {
  areas: Array<LogArea>
  notes?: string
  album_url?: string
  corrective_actions: Array<LogCorrectiveAction>
}

export interface LogArea {
  id: number
  name: string
  time?: string
  notes?: string
  person_performing_sanitation?: string
  types: Array<LogType>
}

export interface LogType {
  id: number
  name: string
  items: Array<LogItem>
}

export interface LogItem {
  id: number
  name: string
  status?: number
  corrective_action?: string
  notes?: string
}

export interface LogCorrectiveAction {
  id: number
  name: string
}
