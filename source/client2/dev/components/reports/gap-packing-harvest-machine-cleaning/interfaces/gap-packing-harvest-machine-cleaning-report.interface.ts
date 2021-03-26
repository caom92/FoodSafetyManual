import { SuperReportInterface } from '../../super-report/super.report.interface'

export interface Report extends SuperReportInterface {
  machines: Array<ReportMachine>
}

export interface ReportMachine {
  entry_num: number
  date: string
  harvest_machine_quantity: number
  disinfection: boolean
  soap_bag_wash: boolean
  rinse: boolean
  conditions: boolean
  noted_defects: string
  intitials: string
}