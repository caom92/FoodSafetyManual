import { SuperReport } from "../../super-report/super.report.interface"

export interface Report extends SuperReport {
  notes: string
  items: Array<ReportItem>
}

export interface ReportItem {
  id: number
  name: string
  time: string
  quantity: number
  approved: number
  condition: number
  corrective_action: string
  is_sanitized: number
}
