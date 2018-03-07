import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  documents: Array<AuthorizationDocument>
}

export interface AuthorizationDocument {
  id: number
  name: string
  entries: Array<AuthorizationEntry>
}

export interface AuthorizationEntry {
  employee: string
  date: string
  notes: string
  additional_info_url: string
  pictures: string
  files: string
}