import { SuperReport } from "../../super-report/super.report.interface"

export interface Report extends SuperReport {
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
  en: string
  es: string
  items: Array<ReportItem>
}

export interface ReportItem {
  id: number
  order: number
  name: string
  status: number
  corrective_action_id: number
  corrective_action: string
  comment: string
}