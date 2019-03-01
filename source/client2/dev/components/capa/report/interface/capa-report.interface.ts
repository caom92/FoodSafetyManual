export interface CAPAReportInterface {
  id: number
  capa_number: string
  reference_number: string
  creator_id: number
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
  closure_date: string
  url: string
  creator_name: string
  files: Array<CAPAReportFile>
  images: Array<CAPAReportImage>
}

export interface CAPAReportFile {
  id: number
  path: string
}

export interface CAPAReportImage {
  id: number
  path: string
}

export interface ActiveCAPA {
  id: string | number
}

export interface CAPAReportRequest {
  lang: string
  content: string
  style: string
  company: string
  address: string
  logo: string
  orientation: string
  footer: string
  supervisor: string
  signature: string
  subject?: string
  fontsize?: string
  images?: any
}