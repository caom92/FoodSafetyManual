import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  machines: Array<AuthorizationMachine>
}

export interface AuthorizationMachine {
  entry_num: number
  date: string
  harvest_machine_quantity: number
  disinfection: number
  soap_bag_wash: boolean
  rinse: boolean
  conditions: boolean
  noted_defects: string
  initials: string
}