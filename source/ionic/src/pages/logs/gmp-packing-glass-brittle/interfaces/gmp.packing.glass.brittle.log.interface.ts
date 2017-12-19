import { SuperLog } from "../../super-logs/super.logs.log.interface"

export interface Log extends SuperLog {
    areas: Array<LogArea>
}

export interface LogArea {
    id: number
    name: string
    items: Array<LogItem>
}

export interface LogItem {
    id: number
    name: string
    order: number
    quantity: number
}