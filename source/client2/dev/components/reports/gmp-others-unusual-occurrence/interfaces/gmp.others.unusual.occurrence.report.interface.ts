import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  entry: Array<ReportEntry>
}

export interface ReportEntry {
  incident_date: string
  time: string
  shift: string
  area: string
  product_name: string
  batch: string
  description: string
  corrective_action: string
  album_url: string
}
