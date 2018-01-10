import { SuperReport } from "../../super-report/super.report.interface"

export interface Report extends SuperReport {
  time: string
  itemss: Array<ReportItem>
}

export interface ReportItem {
  id: number
  name: string
  test: number
  calibration: number
  sanitization: number
  deficiencies: string
  corrective_action: string
}
