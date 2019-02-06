import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  reports: {
    document: {
      id: number
      name: string
      entries: {
        employee: string
        date: string
        notes: string
        additional_info_url: string
        pictures: string
        files: string
      }
    }
  }
}