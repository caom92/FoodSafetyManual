import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  items: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  id: number
  name: string
  weeks: Array<AuthorizationWeek>
}

export interface AuthorizationWeek {
  id: number
  week_num: number
  date: string
  types: Array<AuthorizationType>
}

export interface AuthorizationType {
  id: number
  name_en: string
  name_es: string
  tests: Array<AuthorizationTest>
}

export interface AuthorizationTest {
  id: number
  test_num: number
  reading: number
  notes: string
}