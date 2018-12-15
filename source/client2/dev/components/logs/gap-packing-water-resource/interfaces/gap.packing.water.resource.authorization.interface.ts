import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  areas: Array<AuthorizationArea>
}

export interface AuthorizationArea {
  id: number
  name: string
  items: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  id: number
  name: string
  date: string
  compliance: number
  reason: string
  corrective_actions: string
}