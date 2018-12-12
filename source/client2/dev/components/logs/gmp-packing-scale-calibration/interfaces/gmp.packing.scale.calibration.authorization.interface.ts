import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  notes: string
  corrective_action: string
  types: {
    units: Array<Units>
    scales: Array<AuthorizationType>
  }
}

export interface Units {
  id: number
  symbol: string
}

export interface AuthorizationType {
  id: number
  name: string
  time: string
  items: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  id: number
  position: number
  name: string
  test: number
  unit: number
  quantity: number
  status: number
  is_sanitized: number
}
