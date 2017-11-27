export interface UpdateLog {
  report_id: string
  time: string
  items: Array<UpdateItem>
}

export interface UpdateItem {
  id: number
  test: number
  calibration: boolean
  sanitization: boolean
  deficiencies: string
  corrective_action: string
}