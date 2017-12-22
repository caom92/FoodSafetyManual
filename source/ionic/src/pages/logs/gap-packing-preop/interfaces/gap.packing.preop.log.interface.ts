export interface Log {
    zone_name: string,
    program_name: string,
    module_name: string,
    log_name: string,
    html_footer: string,
    areas: {
        corrective_actions: Array<CorrectiveAction>,
        logs: Array<LogArea>
    }
}

export interface LogArea {
    id: number,
    name: string,
    types: Array<LogType>
}

export interface LogType {
    id: number,
    name: string,
    items: Array<LogItem>
}

export interface LogItem {
    id: number,
    name: string,
    order: number
}

export interface CorrectiveAction {
    id: number,
    code: string,
    en: string,
    es: string
}