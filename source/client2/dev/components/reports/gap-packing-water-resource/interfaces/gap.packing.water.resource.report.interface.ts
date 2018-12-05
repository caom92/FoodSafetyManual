import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  areas: Array<ReportArea>
}

export interface ReportArea {
  id: number
  name: string
  items: Array<ReportItem>
}

export interface ReportItem {
  id: number
  name: string
  date: string
  compliance: number
  corrective_actions: string
}
