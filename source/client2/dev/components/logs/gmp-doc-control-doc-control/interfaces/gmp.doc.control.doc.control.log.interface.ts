import { SuperLog } from '../../super-logs/super.logs.log.interface'

export interface Log extends SuperLog {
  documents: Array<LogDocument>
}

export interface LogDocument {
  id: number
  name: string
}