import { SuperAuthorization } from "../../super-logs/super.logs.authorization.interface"

export interface Authorization extends SuperAuthorization {
  notes: string
  items: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  id: number
  name: string
  time: string
  quantity: number
  approved: number
  condition: number
  corrective_action: string
  is_sanitized: number
}