import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  items: Array<ReportItem>
}

export interface ReportItem {
  id: number
  name: string
  fields: Array<ReportField>
}

export interface ReportField {
  id: number
  position: number
  name_en: string
  name_es: string
  field_id: number
  value: string | number
}