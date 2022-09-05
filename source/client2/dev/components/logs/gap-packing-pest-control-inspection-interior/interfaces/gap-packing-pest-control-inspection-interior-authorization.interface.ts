import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  area_verifications: Array<AuthorizationItemAreaVerification>
  corrective_actions: Array<AuthorizationItemCorrectiveAction>
  equipment_status: Array<AuthorizationItemEquipmentStatus>
  pest_types: Array<AuthorizationItemPestType>
  protection_status: Array<AuthorizationItemProtectionStatus>
  tasks: Array<AuthorizationItemTask>
  areas: Array<AuthorizationArea>
}

export interface AuthorizationArea {
  id: number
  name: string
  area_verification_id?: number
  corrective_action_id?: number
  equipment_status_id?: number
  pest_type_id?: number
  protection_status_id?: number
  task_id?: number
  captured_pests?: number
  observations?: string
}

export interface AuthorizationItemAreaVerification {
  id: number
  name: string
}

export interface AuthorizationItemCorrectiveAction {
  id: number
  name: string
}

export interface AuthorizationItemEquipmentStatus {
  id: number
  name: string
}

export interface AuthorizationItemPestType {
  id: number
  name: string
}

export interface AuthorizationItemProtectionStatus {
  id: number
  name: string
}

export interface AuthorizationItemTask {
  id: number
  name: string
}