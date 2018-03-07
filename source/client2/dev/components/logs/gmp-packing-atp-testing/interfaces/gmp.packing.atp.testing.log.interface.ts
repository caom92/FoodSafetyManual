import { SuperLog } from '../../super-logs/super.logs.log.interface'

export interface Log extends SuperLog {
  
}

export interface LogEntry {
  name: string
  time: string
  items: Array<LogTest>
}

export interface LogTest {
  test_number: number
  test1: number
  results1: boolean
  corrective_action: string
  test2: number
  results2: boolean
}