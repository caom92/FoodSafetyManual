import { SuperWaiting } from '../../super-logs/super.logs.waiting.interface'

export interface Log extends SuperWaiting {
  days: Array<LogDay>
}

export interface LogDay {
  date: string
  time: string
  initials: string
  bathroom_num: number
  day_num: number
  items: Array<LogItem>
}

export interface LogItem {
  item_id: number
  name: string
  status?: boolean
  activity?: string
}