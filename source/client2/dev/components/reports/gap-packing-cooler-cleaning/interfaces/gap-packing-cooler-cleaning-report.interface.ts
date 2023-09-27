import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  notes: string
  album_url: string
  areas: Array<ReportArea>
}

export interface ReportArea {
  id: number
  name: string
  person_performing_sanitation: string
  notes: string
  time: string
  types: Array<ReportType>
}

export interface ReportType {
  id: number
  name: string
  items: Array<ReportItem>
}

export interface ReportItem {
  id: number
  order: number
  name: string
  status: number
  corrective_action: string
  comment: string
}
