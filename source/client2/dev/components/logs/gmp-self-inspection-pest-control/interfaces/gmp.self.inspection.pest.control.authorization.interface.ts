import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  notes: string
  rooms: Array<AuthorizationArea>
}

export interface AuthorizationArea {
  id: number
  name: string
  stations: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  id: number
  order: string
  name: string
  secured: number
  condition: number
  activity: number
  corrective_actions: string
  observations: string
}