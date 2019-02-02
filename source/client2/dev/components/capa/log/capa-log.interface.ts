export interface CAPAForm {
  id: number
  capa_number: string
  reference_number: string
  creator_id: number
  creator_name: string
  capture_date: string
  reference: string
  description: string
  observer: string
  occurrence_date: string
  findings: string
  root_cause: string
  preventive_actions: string
  corrective_actions: string
  planned_date: string
  assigned_personnel: string
  follow_up: string
  actual_date: string
  status: string
  accepter_id: number
  accepter_name: string
  closure_date: string
  url: string
  images: Array<CAPAImage>
  files: Array<CAPAImage>
}

export interface CAPAImage {
  id: number
  path: string
}

export interface CAPAFile {
  id: number
  path: string
}