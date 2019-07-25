import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  days: Array<ReportDay>
}

export interface ReportDay {
  date: string
  day_num: number
  tools: Array<ReportTool>
}

export interface ReportTool {
  tool_id: number
  name: string
  issue_time: string
  issue_qty: number
  issue_conditions: number
  recovery_time: string
  recovery_qty: number
  recovery_conditions: number
  sanitation: string
  deficiencies: string
  corrective_actions: string
}