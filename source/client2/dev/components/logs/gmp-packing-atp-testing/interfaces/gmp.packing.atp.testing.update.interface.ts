import { SuperUpdateLog } from '../../super-logs/super.logs.update.interface'

export interface UpdateLog extends SuperUpdateLog {
  notes: string
  areas: Array<UpdateEntry>
}

export interface UpdateEntry {
  name: string
  time: string
  items: Array<UpdateTest>
}

export interface UpdateTest {
  test_number: string
  test1: number
  results1: boolean
  corrective_action: string
  test2: number
  results2: boolean
}