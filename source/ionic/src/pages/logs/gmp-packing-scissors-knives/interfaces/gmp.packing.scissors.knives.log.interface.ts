export interface Log {
    zone_name: string,
    program_name: string,
    module_name: string,
    log_name: string,
    html_footer: string,
    items: Array<LogItem>
}

export interface LogItem {
    id: number,
    name: string,
    quantity: number
}