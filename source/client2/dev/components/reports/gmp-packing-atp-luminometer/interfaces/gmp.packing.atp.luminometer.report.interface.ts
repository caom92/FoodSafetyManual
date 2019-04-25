import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  items: Array<ReportItem>
}

export interface ReportItem {
  id: number
  name: string
  weeks: Array<ReportWeek>
}

export interface ReportWeek {
  id: number
  week_num: number
  date: string
  types: Array<ReportType>
}

export interface ReportType {
  id: number
  name_en: string
  name_es: string
  tests: Array<ReportTest>
}

export interface ReportTest {
  id: number
  test_num: number
  reading: number
  notes: string
}
