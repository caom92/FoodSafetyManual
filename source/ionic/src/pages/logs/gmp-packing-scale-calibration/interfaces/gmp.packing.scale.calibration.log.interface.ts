export interface Log {
    zone_name: string,
    program_name: string,
    module_name: string,
    log_name: string,
    html_footer: string,
    types: LogType
}

export interface LogType {
    units: Array<LogUnit>,
    scales: Array<LogScale>
}

export interface LogUnit {
    id: number,
    symbol: string
}

export interface LogScale {
    id: number,
    name: string,
    items: Array<LogItem>
}

export interface LogItem {
    id: number,
    name: string,
    order: number
}