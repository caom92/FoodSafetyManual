import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  areas: Array<AuthorizationArea>
  notes?: string
  album_url?: string
  corrective_actions: Array<AuthorizationCorrectiveAction>
}

export interface AuthorizationArea {
  id: number
  name: string
  time?: string
  notes?: string
  person_performing_sanitation?: string
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
  corrective_action?: string
  notes?: string
}

export interface AuthorizationCorrectiveAction {
  id: number
  name: string
}
