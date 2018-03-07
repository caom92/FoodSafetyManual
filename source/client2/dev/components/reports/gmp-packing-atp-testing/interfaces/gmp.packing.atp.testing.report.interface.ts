import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  notes: string
  areas: Array<ReportEntry>
}

export interface ReportEntry {
  name: string
  time: string
  items: Array<ReportTest>
}

export interface ReportTest {
  id: number
  test_number: number
  test1: number
  results1: number
  corrective_action: string
  test2: number
  results2: number
}