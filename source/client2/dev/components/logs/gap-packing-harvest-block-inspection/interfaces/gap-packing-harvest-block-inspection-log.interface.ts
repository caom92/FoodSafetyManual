import { SuperWaiting } from '../../super-logs/super.logs.waiting.interface'

export interface Log extends SuperWaiting {
  inspection_start_date?: string
  inspection_start_time?: string
  inspection_end_date?: string
  inspection_end_time?: string
  commodities?: string
  pounds?: number
  grower?: string
  block_code?: string
  contact?: string
  location?: string
  country?: string
  items: Array<LogItem>
}

export interface LogItem {
  id: number
  name: string
  status?: number
  comment?: string
}