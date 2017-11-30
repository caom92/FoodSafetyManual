export interface Log {
    zone_name: string,
    program_name: string,
    module_name: string,
    log_name: string,
    html_footer: string,
    rooms: Array<LogRoom>
}

export interface LogRoom {
    id: number,
    name: string,
    stations: Array<LogStation>
}

export interface LogStation {
    id: number,
    order: number,
    name: string
}
