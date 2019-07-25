import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  days: Array<AuthorizationDay>
}

export interface AuthorizationDay {
  date: string
  day_num: number
  tools: Array<AuthorizationTool>
}

export interface AuthorizationTool {
  tool_id: number
  name: string
  issue_time?: string
  issue_qty?: number
  issue_conditions?: number
  recovery_time?: string
  recovery_qty?: number
  recovery_conditions?: number
  sanitation?: string
  deficiencies?: string
  corrective_actions?: string
}