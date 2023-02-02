import { SuperWaiting } from '../../super-logs/super.logs.waiting.interface'

export interface Log extends SuperWaiting {
  areas: Array<LogArea>
}

export interface LogArea {
  id: number
  name: string
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
}
