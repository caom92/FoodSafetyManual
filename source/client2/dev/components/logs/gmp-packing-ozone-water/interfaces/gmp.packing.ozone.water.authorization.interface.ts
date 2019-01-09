import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  items: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  id: number
  name: string
  fields: Array<AuthorizationField>
  entries: Array<AuthorizationEntry>
}

export interface AuthorizationEntry {
  test_number: number
  time: string
  fields: Array<AuthorizationField>
}

export interface AuthorizationField {
  id: number
  is_active: number
  name_en: string
  name_es: string
  field_id: number
  value: string | number
}