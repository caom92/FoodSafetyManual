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
  notes: string
  itemss: Array<ReportItem>
}

export interface ReportItem {
  id: number
  name: string
  time: string
  quantity: number
  approved: number
  condition: number
  corrective_action: string
  is_sanitized: number
}
