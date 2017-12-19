import { SuperAuthorization } from "../../super-logs/super.logs.authorization.interface"

export interface Authorization extends SuperAuthorization {
  notes: string
  items: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  id: string
  name: string
  is_acceptable: string
}