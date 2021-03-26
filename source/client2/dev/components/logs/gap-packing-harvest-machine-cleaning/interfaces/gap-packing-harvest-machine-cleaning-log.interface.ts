import { SuperWaiting } from '../../super-logs/super.logs.waiting.interface'

export interface Log extends SuperWaiting {
  machines: Array<LogMachine>
}

export interface LogMachine {
  entry_num: number
  date?: string
  harvest_machine_quantity?: number
  disinfection?: number
  soap_bag_wash?: boolean
  rinse?: boolean
  conditions?: boolean
  noted_defects?: string
  initials?: string
}