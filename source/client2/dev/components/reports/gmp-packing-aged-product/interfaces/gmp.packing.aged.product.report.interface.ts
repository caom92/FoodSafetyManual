import { SuperReportInterface } from "../../super-report/super.report.interface"

export interface Report extends SuperReportInterface {
  entries: Array<ReportEntry>
}

export interface ReportEntry {
  batch: string
  warehouse: string
  vendor: string
  item: string
  age: number
  quality_id: number
  quality: string
  origin: string
  packed_date: string
  quantity: number
  location: string
  action_id: number
  action_name: string
  notes: string
  album_url: string
}