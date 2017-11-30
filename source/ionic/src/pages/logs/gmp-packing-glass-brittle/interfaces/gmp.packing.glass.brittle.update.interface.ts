export interface UpdateLog {
  report_id: string,
  notes: string,
  time: string
  areas: Array<UpdateArea>
}

export interface UpdateArea {
  id: number,
  items: Array<UpdateItem>
}

export interface UpdateItem {
  id: number
  is_acceptable: boolean
}