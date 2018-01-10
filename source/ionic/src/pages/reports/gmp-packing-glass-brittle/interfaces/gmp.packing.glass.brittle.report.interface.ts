import { SuperReport } from "../../super-report/super.report.interface"

export interface Report extends SuperReport {
  time: string
  notes: string
  areas: Array<ReportArea>
}

export interface ReportArea {
  id: number
  name: string
  items: Array<ReportItem>
}

export interface ReportItem {
  id: number
  order: number
  name: string
  quantity: number
  status: number
}
