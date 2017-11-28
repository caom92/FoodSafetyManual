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
  time: string
  notes: string
  areas: Array<AuthorizationArea>
}

export interface AuthorizationArea {
  id: number
  name: string
  items: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  id: number
  name: string
  order: number
  status: number
  quantity: number
}