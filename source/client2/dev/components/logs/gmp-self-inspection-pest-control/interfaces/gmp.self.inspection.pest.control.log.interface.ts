import { SuperLog } from '../../super-logs/super.logs.log.interface'

export interface Log extends SuperLog {
  rooms: Array<LogArea>
}

export interface LogArea {
  id: number
  name: string
  stations: Array<LogItem>
}

export interface LogItem {
  id: number
  order: number
  name: string
}