import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  items: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  id: number
  name: string
  fields: Array<AuthorizationField>
}

export interface AuthorizationField {
  id: number
  position: number
  name_en: string
  name_es: string
  field_id: number
  value: string | number
}