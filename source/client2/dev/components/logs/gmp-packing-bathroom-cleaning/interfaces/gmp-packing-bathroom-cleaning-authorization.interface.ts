import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  days: Array<AuthorizationDay>
}

export interface AuthorizationDay {
  date: string
  time: string
  initials: string
  day_num: number
  items: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  item_id: number
  name: string
  status?: boolean
  activity?: string
}