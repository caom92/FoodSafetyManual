import { SuperReportInterface } from "../../super-report/super.report.interface"

export interface Report extends SuperReportInterface {
  time: string
  itemss: Array<ReportItem>
}

export interface ReportItem {
  id: number
  name: string
  test: number
  deficiencies: string
  corrective_action: string
}
