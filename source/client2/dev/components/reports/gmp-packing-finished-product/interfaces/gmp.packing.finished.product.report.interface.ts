import { SuperReportInterface } from "../../super-report/super.report.interface"

export interface Report extends SuperReportInterface {
  entries: Array<ReportEntry>
}

export interface ReportEntry {
  batch: string
  production_area: string
  supplier: string
  product: string
  customer: string
  quality_id: number
  quality: string
  origin: string
  expiration_date: string
  water_temperature: number
  product_temperature: number
  is_weight_correct: number
  is_label_correct: number
  is_trackable: number
  notes: string
  album_url: string
}