import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  areas: Array<AuthorizationArea>
}

export interface AuthorizationArea {
  id: number
  name: string
  types: Array<AuthorizationType>
}

export interface AuthorizationType {
  id: number
  name: string
  items: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  id: number
  name: string
  status?: number
}
