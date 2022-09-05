import { SuperWaiting } from '../../super-logs/super.logs.waiting.interface'

export interface Log extends SuperWaiting {
  area_verifications: Array<LogItemAreaVerification>
  corrective_actions: Array<LogItemCorrectiveAction>
  equipment_status: Array<LogItemEquipmentStatus>
  pest_types: Array<LogItemPestType>
  protection_status: Array<LogItemProtectionStatus>
  tasks: Array<LogItemTask>
  areas: Array<LogArea>
}

export interface LogArea {
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

export interface LogItemAreaVerification {
  id: number
  name: string
}

export interface LogItemCorrectiveAction {
  id: number
  name: string
}

export interface LogItemEquipmentStatus {
  id: number
  name: string
}

export interface LogItemPestType {
  id: number
  name: string
}

export interface LogItemProtectionStatus {
  id: number
  name: string
}

export interface LogItemTask {
  id: number
  name: string
}