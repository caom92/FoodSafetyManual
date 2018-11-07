import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  time: string
  notes: string
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
  order: number
  status: number
  quantity: number
}