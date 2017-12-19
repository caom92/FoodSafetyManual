import { SuperLog } from "../../super-logs/super.logs.log.interface"

export interface Log extends SuperLog {
    items: Array<LogItem>
}

export interface LogItem {
    id: number
    name: string
    position: number
}