import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  days: Array<ReportDay>
}

export interface ReportDay {
  date: string
  time: string
  initials: string
  day_num: number
  tools: Array<ReportItem>
}

export interface ReportItem {
  item_id: number
  name: string
  status: boolean
  activity: string
}