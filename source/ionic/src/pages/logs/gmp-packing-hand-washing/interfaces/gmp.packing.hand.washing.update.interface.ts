export interface UpdateLog {
  report_id: string,
  notes: string,
  items: Array<UpdateItem>
}

export interface UpdateItem {
  id: number
  is_acceptable: boolean
}