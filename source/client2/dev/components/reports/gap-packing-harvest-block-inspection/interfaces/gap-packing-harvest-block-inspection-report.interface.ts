import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  inspection_start_date: string
  inspection_start_time: string
  inspection_end_date: string
  inspection_end_time: string
  commodities: string
  pounds: number
  grower: string
  block_code: string
  contact: string
  location: string
  country: string
  items: Array<ReportItem>
}

export interface ReportItem {
  id: number
  name: string
  status: number
  comment: string
}