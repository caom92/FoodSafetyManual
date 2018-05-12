import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  items: Array<ReportItem>
}

export interface ReportItem {
  name: string
  reading: string
  ph: number
  orp: number
  temperature: number
  corrective_action: string
  product: string
  batch: string
  parcel: string
  reference: string
  total_chlorine: number
  free_chlorine: number
  rinse: number
  status: number
}