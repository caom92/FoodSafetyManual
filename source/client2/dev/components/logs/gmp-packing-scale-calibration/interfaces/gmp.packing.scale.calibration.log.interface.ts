import { SuperLog } from '../../super-logs/super.logs.log.interface'

export interface Log extends SuperLog {
    types: LogType
}

export interface LogType {
    units: Array<LogUnit>
    scales: Array<LogScale>
}

export interface LogUnit {
    id: number
    symbol: string
}

export interface LogScale {
    id: number
    name: string
    items: Array<LogItem>
}

export interface LogItem {
    id: number
    name: string
    position: number
}