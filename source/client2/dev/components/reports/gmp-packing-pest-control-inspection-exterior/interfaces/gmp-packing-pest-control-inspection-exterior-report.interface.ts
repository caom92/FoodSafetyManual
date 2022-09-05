import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  overview: Array<ReportOverview>
}

export interface ReportOverview {
  id: number
  name: string
  total_pests: number
}