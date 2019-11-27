import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  notes: string
  rooms: Array<ReportArea>
}

export interface ReportArea {
  id: number
  name: string
  stations: Array<ReportItem>
}

export interface ReportItem {
  id: number
  order: number
  name: string
  secured: number
  condition: number
  activity: number
  corrective_actions: string
}
