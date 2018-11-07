import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  notes: string
  corrective_action: string
  areas: Array<ReportType>
}

export interface ReportType {
  id: number
  name: string
  time: string
  items: Array<ReportItem>
}

export interface ReportItem {
  id: number
  order: number
  name: string
  test: number
  unit: string
  status: number
  is_sanitized: number
}
