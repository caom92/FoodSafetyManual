export interface UpdateLog {
  report_id: string,
  notes: string,
  items: Array<UpdateItem>
}

export interface UpdateItem {
  id: number
  time: string
  approved: boolean
  condition: boolean
  corrective_action: string
  is_sanitized: boolean
}