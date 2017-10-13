export interface Log {
    zone_name: string,
    program_name: string,
    module_name: string,
    log_name: string,
    html_footer: string,
    areas: Array<LogArea>
}

export interface LogArea {
    id: number,
    name: string,
    items: Array<LogItem>
}

export interface LogItem {
    id: number,
    name: string,
    order: number,
    quantity: number
}