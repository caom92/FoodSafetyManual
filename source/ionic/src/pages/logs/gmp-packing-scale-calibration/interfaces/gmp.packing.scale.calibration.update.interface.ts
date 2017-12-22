export interface UpdateLog {
  report_id: string
  notes: string
  corrective_action: string
  types: Array<UpdateType>
}

export interface UpdateType {
  id: number
  time: string
  items: Array<UpdateItem>
}

export interface UpdateItem {
  id: number
  test: number
  unit_id: number
  status: boolean
  is_sanitized: boolean
}