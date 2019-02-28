export interface ReportRequest {
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

export interface ActiveReport {
  id: string | number
}