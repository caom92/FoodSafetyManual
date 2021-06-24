import { SuperWaiting } from '../../super-logs/super.logs.waiting.interface'

export interface Log extends SuperWaiting {
  days: Array<LogDay>
}

export interface LogDay {
  date: string
  day_num: number
  tools: Array<LogTool>
}

export interface LogTool {
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
  corrective_actions?: string,
  is_captured: boolean
}