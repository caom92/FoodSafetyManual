import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  notes: string
  items: Array<ReportItem>
}

export interface ReportItem {
  id: number
  name: string
  is_acceptable: number
}
