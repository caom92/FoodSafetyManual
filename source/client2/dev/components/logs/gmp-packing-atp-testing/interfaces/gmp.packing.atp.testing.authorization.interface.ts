import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  notes: string
  entries: Array<AuthorizationEntry>
}

export interface AuthorizationEntry {
  name: string
  time: string
  items: Array<AuthorizationTest>
}

export interface AuthorizationTest {
  id: string
  test_number: string
  test1: number
  results1: number
  corrective_action: string
  test2: number
  results2: number
}