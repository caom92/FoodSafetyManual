export interface Authorization {
  report_id: string
  created_by: string
  approved_by: string
  creation_date: string
  approval_date: string
  zone_name: string
  program_name: string
  module_name: string
  log_name: string
  notes: string
  items: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  id: number
  name: string
  time: string
  quantity: number
  approved: number
  condition: number
  corrective_action: string
  is_sanitized: number
}