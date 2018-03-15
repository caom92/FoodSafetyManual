export interface SuperReportInterface {
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
  display_date?: string
}