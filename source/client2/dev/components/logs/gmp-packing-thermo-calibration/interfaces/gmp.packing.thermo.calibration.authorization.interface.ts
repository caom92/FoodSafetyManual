import { SuperAuthorization } from "../../super-logs/super.logs.authorization.interface"

export interface Authorization extends SuperAuthorization {
  time: string
  items: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  id: number
  name: string
  test: number
  calibration: number
  sanitization: number
  deficiencies: string
  corrective_action: string
}