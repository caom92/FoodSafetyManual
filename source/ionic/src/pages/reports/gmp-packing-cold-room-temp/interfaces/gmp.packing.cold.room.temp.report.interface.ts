export interface Report {
  report_id: number
  created_by: string
  approved_by: string
  signature_path: string
  creation_date: string
  approval_date: string
  zone_name: string
  program_name: string
  module_name: string
  log_name: string
  time: string
  itemss: Array<ReportItem>
}

export interface ReportItem {
  id: number
  name: string
  test: number
  deficiencies: string
  corrective_action: string
}
