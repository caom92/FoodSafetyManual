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
  corrective_action: string
  types: {
    units: Array<Units>
    scales: Array<AuthorizationType>
  }
}

export interface Units {
  id: number
  symbol: string
}

export interface AuthorizationType {
  id: number
  name: string
  time: string
  items: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  id: number
  position: number
  name: string
  test: number
  unit: number
  status: number
  is_sanitized: number
}
