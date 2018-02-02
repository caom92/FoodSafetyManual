import { SuperReportInterface } from "./super.report.interface"

export interface SuperReport {
  report: SuperReportInterface
  rep: any
  getPDFReportBody()
  getPDFReportHeader()
  getCSS()
}