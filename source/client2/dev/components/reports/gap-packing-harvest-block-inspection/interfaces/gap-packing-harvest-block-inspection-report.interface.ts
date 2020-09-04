import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  inspection_start_date: string
  inspection_start_time: string
  inspection_end_date: string
  inspection_end_time: string
  commodities: string
  units: number
  unit_type: number
  grower: string
  block_code: string
  contact: string
  location: string
  country: string
  items: Array<ReportItem>
  unit_types: Array<ReportUnitType>
}

export interface ReportItem {
  id: number
  name: string
  status: number
  comment: string
}

export interface ReportUnitType {
  id: number
  name_en: string
  name_es: string
}