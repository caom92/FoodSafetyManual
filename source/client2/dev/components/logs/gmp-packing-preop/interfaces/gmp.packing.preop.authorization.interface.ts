import { SuperAuthorization } from "../../super-logs/super.logs.authorization.interface"

export interface Authorization extends SuperAuthorization {
  notes: string
  album_url: string
  areas: {
    corrective_actions: Array<CorrectiveAction>
    logs: Array<AuthorizationArea>
  }
}

export interface CorrectiveAction {
  id: number
  code: string
  en: string
  es: string
}

export interface AuthorizationArea {
  id: number
  name: string
  person_performing_sanitation: string
  notes: string
  time: string
  types: Array<AuthorizationType>
}

export interface AuthorizationType {
  id: number
  en: string
  es: string
  items: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  id: number
  order: number
  name: string
  status: number
  corrective_action_id: number
  corrective_action: string
  comment: string
}